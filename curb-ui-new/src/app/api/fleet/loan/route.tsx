import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function POST(request: any) {
  try {
    const { payload } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!payload) {
      return NextResponse.json({
        message: 'Car Loan Payload is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/loan`, {
      ...payload,
    }).then((res) => res.data);

    return NextResponse.json({
      result: {
        accessToken
      },
    }, { status: 201 });
  } catch (e) {
    console.error('Unable to create car make', e);
    return NextResponse.json({
      message: 'Failed to create car make',
      result: e,
    }, { status: 500 });
  }
}
