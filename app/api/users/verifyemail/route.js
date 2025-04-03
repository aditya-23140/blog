import { connect } from "@/lib/conn";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/lib/model/user";

export async function POST(request) {
  try {
    await connect();

    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
}
