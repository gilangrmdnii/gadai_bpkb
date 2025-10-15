"use client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal validation
    if (!body?.namaLengkap || !body?.noHP) {
      return NextResponse.json(
        { success: false, message: "Nama dan nomor HP wajib diisi" },
        { status: 400 }
      );
    }

    // Google Apps Script endpoint
    const SHEET_URL =
      "https://script.google.com/macros/s/AKfycbyzHyxiAjyciIyQp0cOPBNKOzvn_9W5JKjpcEQixqwMQ09eyM7YGCmO_neAaWBAIHIh/exec";

    // Timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Speedsheet error:", res.statusText);
      return NextResponse.json(
        { success: false, message: "Gagal mengirim ke Google Script" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Proxy error:", err.name || err);
    const message =
      err.name === "AbortError"
        ? "Koneksi lambat atau tidak stabil"
        : "Gagal mengirim data";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
