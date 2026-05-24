import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      scope: "repo,user",
    });
    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?${params}`
    );
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });

  const data = await res.json();

  if (data.error) {
    return new NextResponse(
      `<script>window.opener.postMessage('authorization:github:error:${JSON.stringify(data)}', '*')</script>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    `<!doctype html><html><body><p>Logging in…</p><script>
      (function(){
        var token = ${JSON.stringify(data.access_token)};
        var payload = 'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' });
        if (!window.opener) {
          document.body.innerHTML = '<p>Error: no opener window. Please close this and try again.</p>';
          return;
        }
        function receive(e){
          if (e.data === 'authorizing:github') {
            window.opener.postMessage(payload, e.origin);
            window.removeEventListener('message', receive);
            setTimeout(function(){ window.close(); }, 500);
          }
        }
        window.addEventListener('message', receive, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
