import { NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/app/helpers/jwt';
import axios from 'axios';
import {encrypt} from 'unixcrypt';

export async function POST(request: any) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        message: 'Both email and password fields are required'
      }, { status: 400 });
    }

    const base64EncodedPassword = Buffer.from(password).toString('base64');

    const user = await axios.get(`${process.env.CURB_SERVER_URL}/user/login/${email}/${base64EncodedPassword}`)
      .then((x) => x.data)
      .catch((x) => {
        console.error(x);
        return null;
      });

    if (!user || user === 'error') {
      return NextResponse.json({
        message: 'No such user exists.  Please check your e-mail address and/or password and try again.'
      }, { status: 400 });
    }

    const accessToken = signJwtAccessToken(user);

    return NextResponse.json({
      result: {
        ...user,
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
