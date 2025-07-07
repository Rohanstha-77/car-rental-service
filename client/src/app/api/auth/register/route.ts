import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

     if (!data.username || !data.email || !data.password) {
      return NextResponse.json(
        { success: false, message: "Missing fields" }
      );
    }

    const sendRegisterData = await axios.post("http://localhost:8080/api/user/register", data);

    return NextResponse.json(sendRegisterData.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.response?.data?.message || "Registration failed",
      },
      { status: 500 }
    );
  }
};
