import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    console.log(reqBody); // ! TODO: Delete this log

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // create a new user
    const newUser = new User({ username, email, password: hashPassword });
    const savedUser = await newUser.save();
    console.log(savedUser); // ! TODO: Delete this log

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
