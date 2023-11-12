import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

export async function PUT(request: any) {
  try {
    const { oldPassword, newPassword } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    console.log(`Old=${oldPassword} new=${newPassword}`);

    if (!oldPassword || !newPassword) {
      return NextResponse.json({
        message: 'Passwords are required'
      }, { status: 400 });
    }

    const result = axios.put(`${process.env.CURB_SERVER_URL}/user/profile`, {
      id: decodedJwt.id,
      oldPassword: Buffer.from(oldPassword).toString('base64'),
      newPassword: Buffer.from(newPassword).toString('base64'),
    }).then((res) => {
      return res.data;
    });

    console.log('4');
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