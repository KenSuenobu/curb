import { NextResponse } from 'next/server';
import axios from 'axios';
import { verifyJwt } from '@/app/helpers/jwt';

export async function GET(request: any) {
  console.log(`Request: ${JSON.stringify(request, null, 2)}`);
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

export async function POST(request: any) {
  try {
    const { make } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!make) {
      return NextResponse.json({
        message: 'Car make is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-make/create`,
      {
        creatorId: decodedJwt.id,
        name: make,
      })
      .then((res) => res.data);

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