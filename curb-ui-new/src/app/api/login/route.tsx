import { NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/app/helpers/jwt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        message: 'Both email and password fields are required'
      }, { status: 400 });
    }

    // Call local server login service
    // if (!user) {
    //   return NextResponse.json({
    //     message: 'No such user exists',
    //   }, { status: 400 });
    // }

    const accessToken = signJwtAccessToken({
      userId: '1c59e125-9b29-4566-bc96-e64056c50cb4'
    });

    console.log(`Access token: ${JSON.stringify(accessToken, null, 2)}`);

    return NextResponse.json({
      result: {
        userId: 2,
        accessToken
      },
    }, { status: 200 });
  } catch(e) {
    console.error(e);
    return NextResponse.json({
      message: 'Something went wrong while trying to log in',
      result: e
    }, {
      status: 500,
    });
  }
}
