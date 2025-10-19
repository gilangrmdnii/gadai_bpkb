import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbyzHyxiAjyciIyQp0cOPBNKOzvn_9W5JKjpcEQixqwMQ09eyM7YGCmO_neAaWBAIHIh/exec";

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengirim data", error },
      { status: 500 }
    );
  }
}
