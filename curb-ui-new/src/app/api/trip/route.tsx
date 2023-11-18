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
        message: 'Address payload is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/trip/create`,
        {
          ...payload,
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

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const fleetCarId = searchParams.get('fleetCarId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    if (!fleetCarId) {
      return NextResponse.json({
        message: 'Fleet Car ID is missing',
      }, { status: 404 });
    }

    const trips: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/list/car/${fleetCarId}`)
      .then((res) => res.data);

    return NextResponse.json({trips}, {status: 200});
  } catch (e) {
    console.error('Unable to get list of cars for fleet', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of fleet cars',
      result: e,
    }, { status: 500 });
  }
}
