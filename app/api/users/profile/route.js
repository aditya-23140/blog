import { connect } from "@/lib/conn";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/lib/model/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request) {
  try {
    await connect();

    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password"); //.select("-password") removes password from showing

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    return NextResponse.json(
      { messsage: "User found", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
