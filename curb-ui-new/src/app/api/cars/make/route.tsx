import { NextResponse } from 'next/server';
import axios from 'axios';
import { verifyJwt } from '@/app/helpers/jwt';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-make/list`)
      .then((res) => res.data);

    return NextResponse.json({ makes }, { status: 200 });
  } catch (e) {
    console.error('Unable to get list of car makes', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of car makes',
      result: e,
    }, { status: 500 });
  }
}