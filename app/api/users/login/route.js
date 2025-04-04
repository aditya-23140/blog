import { connect } from "@/lib/conn";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/lib/model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connect();
    const payload = await request.json();
    const { email, passwd } = payload;
    console.log(payload);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    if (!user.isVerified) {
      return NextResponse.json({ error: "User not verified" }, { status: 400 });
    }
    console.log("User exists");

    const validpassword = await bcrypt.compare(passwd, user.passwd);

    if (!validpassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Logged in success",
      success: true,
    });

    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
}
