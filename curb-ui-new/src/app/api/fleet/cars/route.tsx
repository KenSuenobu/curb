import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const fleetId = searchParams.get('fleetId');
    const fleetCarId = searchParams.get('fleetCarId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    if (!fleetId && !fleetCarId) {
      return NextResponse.json({
        message: 'Fleet ID or Fleet Car ID missing',
      }, { status: 404 });
    }

    if (fleetId) {
      const cars: any = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/list/fleet/${fleetId}`)
        .then((res) => res.data);

      return NextResponse.json({cars}, {status: 200});
    } else {
      const cars: any = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/get/fleet-car/${fleetCarId}`)
        .then((res) => res.data);

      return NextResponse.json({cars}, {status: 200});
    }
  } catch (e) {
    console.error('Unable to get list of cars for fleet', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of fleet cars',
      result: e,
    }, { status: 500 });
  }
}

export async function POST(request: any) {
  try {
    const { fleetId, carTrimId } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!fleetId) {
      return NextResponse.json({
        message: 'Fleet ID is required'
      }, { status: 400 });
    }

    if (!carTrimId) {
      return NextResponse.json({
        message: 'Car Trim ID is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/car`, {
      fleetId,
      ownerId: decodedJwt.id,
      carTrimId,
      data: {}
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

export async function PUT(request: any) {
  try {
    const { payload } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!payload) {
      return NextResponse.json({
        message: 'Payload for editing is required'
      }, { status: 400 });
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/fleet/save/car`, {
      ...payload,
    }).then((res) => {
      return res.data;
    });

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