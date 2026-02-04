import { NextRequest, NextResponse } from "next/server";

const GHL_API_URL = "https://services.leadconnectorhq.com/contacts/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Get credentials from environment
    const accessToken = process.env.GHL_ACCESS_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!accessToken || !locationId) {
      console.error("Missing GHL credentials in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send to GoHighLevel
    const ghlResponse = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        locationId,
        source: "Website Waitlist",
        tags: ["waitlist"],
      }),
    });

    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.text();
      console.error("GoHighLevel API error:", ghlResponse.status, errorData);
      return NextResponse.json(
        { error: "Failed to save contact" },
        { status: 500 }
      );
    }

    const ghlData = await ghlResponse.json();

    return NextResponse.json({
      success: true,
      contactId: ghlData.contact?.id,
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
