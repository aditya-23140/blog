import { connect } from "@/lib/conn";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/lib/model/user";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request) {
  try {
    await connect();
    const payload = await request.json();
    const { username, name, email, passwd, date_of_birth } = payload;

    //validation
    console.log(payload);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists with that email" },
        { status: 400 }
      );
    }

    //HASING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwd, salt);
    const newUser = new User({
      name,
      username,
      email,
      passwd: hashedPassword,
      date_of_birth,
    });

    const savedUser = await newUser.save(); //saves the data;
    console.log(savedUser);

    // Send verification mail
    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

    return NextResponse.json({
      message: "user registered successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
