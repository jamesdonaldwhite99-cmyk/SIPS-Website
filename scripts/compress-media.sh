#!/usr/bin/env bash
#
# compress-media.sh — compress a specific list of image/video files in place,
# keeping the same filename and extension so nothing that references them breaks.
#
# Used by the GitHub Action (.github/workflows/compress-media.yml) to shrink only
# the files that changed in a push — including uploads made through Decap CMS.
# Safe to run anywhere that has ffmpeg + pngquant on PATH (CI uses apt to install
# them). Only replaces a file if the result is actually smaller.
#
# Usage:  bash scripts/compress-media.sh <file> [<file> ...]
set -uo pipefail

MAX_IMG=2048     # image longest edge (px)
MAX_VID=1920     # video longest edge (px)
JPG_QSCALE=4     # ffmpeg mjpeg quality (2=best .. 31=worst); 4 ~ visually q80
PNG_QUALITY="65-88"
VID_CRF=28       # video quality (lower=better); 28 is a safe default
MIN_BYTES=$((150 * 1024))   # ignore files already under 150 KB

size() { stat -c%s "$1" 2>/dev/null || stat -f%z "$1"; }

have_ffmpeg=$(command -v ffmpeg || true)
have_pngquant=$(command -v pngquant || true)

changed=0
for f in "$@"; do
  [ -f "$f" ] || continue
  ext=$(printf '%s' "${f##*.}" | tr '[:upper:]' '[:lower:]')
  before=$(size "$f")
  [ "$before" -lt "$MIN_BYTES" ] && continue
  out="${f}.cmp.${ext}"

  case "$ext" in
    jpg|jpeg)
      [ -n "$have_ffmpeg" ] || continue
      # Only resize OVERSIZED JPEGs (the real win). Leave in-size images untouched:
      # they're already compressed, and re-encoding only degrades them and churns.
      dims=$(ffmpeg -nostdin -hide_banner -i "$f" 2>&1 | grep -oE '[0-9]+x[0-9]+' | head -1)
      w=${dims%x*}; h=${dims#*x}
      longest=$(( ${w:-0} > ${h:-0} ? ${w:-0} : ${h:-0} ))
      [ "$longest" -le "$MAX_IMG" ] && continue
      ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale='min($MAX_IMG,iw)':-2" -q:v "$JPG_QSCALE" "$out" 2>/dev/null || { rm -f "$out"; continue; }
      ;;
    png)
      # Resize ONLY if oversized. Re-encoding an in-size PNG every run would make
      # the result drift and re-churn; quantising a copy in place is stable.
      longest=0
      if [ -n "$have_ffmpeg" ]; then
        dims=$(ffmpeg -nostdin -hide_banner -i "$f" 2>&1 | grep -oE '[0-9]+x[0-9]+' | head -1)
        w=${dims%x*}; h=${dims#*x}
        longest=$(( ${w:-0} > ${h:-0} ? ${w:-0} : ${h:-0} ))
      fi
      if [ "$longest" -gt "$MAX_IMG" ] && [ -n "$have_ffmpeg" ]; then
        ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale='min($MAX_IMG,iw)':-2" "$out" 2>/dev/null || { rm -f "$out"; continue; }
      else
        cp "$f" "$out"
      fi
      # PNG colour-type byte (offset 25): 3 = palette = already quantised. Skip
      # pngquant on those so re-running on an optimised PNG is a true no-op.
      ct=$(od -An -tu1 -j25 -N1 "$out" 2>/dev/null | tr -d ' ')
      if [ -n "$have_pngquant" ] && [ "$ct" != "3" ]; then
        pngquant --quality="$PNG_QUALITY" --strip --force --output "$out" "$out" 2>/dev/null || true
      fi
      ;;
    mp4|mov|webm|m4v)
      [ -n "$have_ffmpeg" ] || continue
      # Keep audio: a general upload may legitimately have sound.
      ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale='min($MAX_VID,iw)':-2" \
        -c:v libx264 -crf "$VID_CRF" -preset slow -pix_fmt yuv420p \
        -movflags +faststart "$out" 2>/dev/null || { rm -f "$out"; continue; }
      ;;
    *)
      continue
      ;;
  esac

  [ -f "$out" ] || continue
  after=$(size "$out")
  # Only replace if it saves a meaningful amount (>5%). This makes re-running on
  # an already-optimised file a no-op, so the Action never produces churn commits.
  if [ "$after" -gt 0 ] && [ $((after * 100)) -lt $((before * 95)) ]; then
    mv "$out" "$f"
    changed=$((changed + 1))
    printf 'compressed  %8d -> %8d  %s\n' "$before" "$after" "$f"
  else
    rm -f "$out"
    printf 'kept        %s (already optimised)\n' "$f"
  fi
done

printf '\n%d file(s) compressed.\n' "$changed"
