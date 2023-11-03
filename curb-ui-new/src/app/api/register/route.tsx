import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const {email, password} = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        message: 'Both email and password fields are required'
      }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Account created',
    }, { status: 201 });
  } catch(e) {
    console.error(e);
    return NextResponse.json({
      message: 'Something went wrong while trying to register',
      result: e
    }, {
      status: 500,
    });
  }
}
