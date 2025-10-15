import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // URL Google Apps Script Web App
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbyzHyxiAjyciIyQp0cOPBNKOzvn_9W5JKjpcEQixqwMQ09eyM7YGCmO_neAaWBAIHIh/exec";

    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Cek apakah response Apps Script valid JSON
    let data;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Google Apps Script tidak merespon JSON" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengirim data ke server" },
      { status: 500 }
    );
  }
}
