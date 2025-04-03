import { connect } from "@/lib/conn";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connect();
    const response = NextResponse.json({
      messsage: "LoggOut Successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
}
