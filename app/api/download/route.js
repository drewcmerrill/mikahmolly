import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  const filePath = "/root/media/workout.pdf";

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const headers = new Headers();
    headers.append("Content-Disposition", "attachment; filename=workout.pdf");
    headers.append("Content-Type", "application/pdf");

    return new NextResponse(fileBuffer, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      { error: `File not found: ${error}` },
      { status: 404 }
    );
  }
}
