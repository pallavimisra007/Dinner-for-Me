export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const apiKey = env.BEEHIIV_API_KEY;
    if (!apiKey) {
      console.error("BEEHIIV_API_KEY is not set");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const pubId = "pub_23d8df55-6519-45af-9ef3-d7d50df2e0b2";

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "dinnerforme.com",
          utm_medium: "website",
        }),
      }
    );

    // 2xx = success. Also treat 422 as success — it usually means
    // the subscriber already exists, which is fine (reactivate_existing handles it).
    if (res.ok || res.status === 422) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    const body = await res.text();
    console.error(`Beehiiv error: ${res.status} — ${body}`);
    return new Response(JSON.stringify({ error: "Subscription service error" }), {
      status: 502,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Subscribe function error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
