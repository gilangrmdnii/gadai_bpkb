import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyzHyxiAjyciIyQp0cOPBNKOzvn_9W5JKjpcEQixqwMQ09eyM7YGCmO_neAaWBAIHIh/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Gagal mengirim data" }, { status: 500 });
  }
}
