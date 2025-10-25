export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    return new Response(
      JSON.stringify({
        success: res.ok,
        status: res.status,
        response: text,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error in /api/save-segment:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send webhook" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
