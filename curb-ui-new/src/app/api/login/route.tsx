import { NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/app/helpers/jwt';
import axios from 'axios';
import {encrypt} from 'unixcrypt';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    const { email, password } = await helper.getPostPayload();

    if (!email || !password) {
      return helper.missingFieldResponse('Email and Password');
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
    return helper.createErrorResponse('Something went wrong while trying to log in', e);
  }
}
