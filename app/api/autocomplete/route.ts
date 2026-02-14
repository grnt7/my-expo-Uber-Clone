// @ts-nocheck
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Get the 'input' from the URL (e.g., /api/autocomplete?input=london)
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const googleUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}&language=en`;

  try {
    const response = await fetch(googleUrl);
    const data = await response.json();

    // 2. Return the Google data back to your Uber app
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from Google" }, { status: 500 });
  }
}