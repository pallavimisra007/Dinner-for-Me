export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = env.BEEHIIV_API_KEY;
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

    if (res.ok || res.status === 201) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await res.text();
    return new Response(JSON.stringify({ error: body }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
