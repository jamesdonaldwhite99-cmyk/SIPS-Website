#!/usr/bin/env bash
#
# optimise-images.sh — shrink oversized JP/PNG assets in place, keeping the
# same filenames and formats so no code references need to change.
#
# What it does:
#   - Resamples any image whose longest side is over MAX_DIM down to MAX_DIM.
#   - Re-encodes JPEGs at JPEG_QUALITY.
#   - Only touches files above MIN_BYTES so small/already-lean assets are left alone.
#
# Requirements: macOS `sips` (built in). No network, no extra installs.
# Originals remain recoverable from git history. Run once, then review the diff.
#
# Usage:  bash scripts/optimise-images.sh [target_dir]
#         (defaults to ./public)
set -euo pipefail

TARGET_DIR="${1:-public}"
MAX_DIM=2048          # longest edge, in pixels
JPEG_QUALITY=80       # 0-100
MIN_BYTES=$((200 * 1024))   # skip files under 200 KB

command -v sips >/dev/null 2>&1 || { echo "sips not found (macOS required)"; exit 1; }

before_total=0
after_total=0
changed=0

# NUL-delimited find so filenames with spaces are safe.
while IFS= read -r -d '' f; do
  bytes=$(stat -f%z "$f")
  [ "$bytes" -lt "$MIN_BYTES" ] && continue

  before_total=$((before_total + bytes))

  # Longest current edge.
  read -r w h < <(sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null \
    | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w, h}')
  longest=$(( w > h ? w : h ))

  ext_lc=$(printf '%s' "${f##*.}" | tr '[:upper:]' '[:lower:]')

  case "$ext_lc" in
    jpg|jpeg)
      if [ "$longest" -gt "$MAX_DIM" ]; then
        sips -Z "$MAX_DIM" -s format jpeg -s formatOptions "$JPEG_QUALITY" "$f" --out "$f" >/dev/null 2>&1
      else
        sips -s format jpeg -s formatOptions "$JPEG_QUALITY" "$f" --out "$f" >/dev/null 2>&1
      fi
      ;;
    png)
      # sips has no lossy PNG; the win here is fewer pixels. Only act if oversized.
      if [ "$longest" -gt "$MAX_DIM" ]; then
        sips -Z "$MAX_DIM" "$f" --out "$f" >/dev/null 2>&1
      fi
      ;;
    *)
      after_total=$((after_total + bytes))
      continue
      ;;
  esac

  new_bytes=$(stat -f%z "$f")
  after_total=$((after_total + new_bytes))
  if [ "$new_bytes" -lt "$bytes" ]; then
    changed=$((changed + 1))
    printf '  %6.2f -> %6.2f MB  %s\n' \
      "$(echo "$bytes/1048576" | bc -l)" "$(echo "$new_bytes/1048576" | bc -l)" "$f"
  fi
done < <(find "$TARGET_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

printf '\nFiles shrunk: %d\n' "$changed"
printf 'Total: %.1f MB -> %.1f MB  (saved %.1f MB)\n' \
  "$(echo "$before_total/1048576" | bc -l)" \
  "$(echo "$after_total/1048576" | bc -l)" \
  "$(echo "($before_total-$after_total)/1048576" | bc -l)"
