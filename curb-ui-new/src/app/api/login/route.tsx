import { NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/app/helpers/jwt';
import axios from 'axios';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        message: 'Both email and password fields are required'
      }, { status: 400 });
    }

    const userId = await axios.get(`${process.env.CURB_SERVER_URL}/user/login/${email}/${password}`)
      .then((x) => x.data)
      .catch((x) => {
        console.error(x);
        return null;
      });

    if (!userId || userId === 'error') {
      return NextResponse.json({
        message: 'No such user exists.  Please check your e-mail address and/or password and try again.'
      }, { status: 400 });
    }

    const accessToken = signJwtAccessToken({
      userId
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
