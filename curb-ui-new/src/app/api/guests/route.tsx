import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const guestId = searchParams.get('guestId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    if (!guestId) {
      return NextResponse.json({
        message: 'Guest not found by ID',
      }, { status: 404 });
    }

    const guest = await axios.get(`${process.env.CURB_SERVER_URL}/guest/get/${guestId}`)
      .then((res) => res.data);

    return NextResponse.json({ guest }, { status: 200 });
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
    const { payload } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!payload) {
      return NextResponse.json({
        message: 'Missing payload'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/guest/create`,
        {
          ...payload,
          creatorId: decodedJwt.id,
        })
      .then((res) => res.data);

    return NextResponse.json({
      result: {
        accessToken,
        created: result,
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
        message: 'Missing payload'
      }, { status: 400 });
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/guest/edit`,
        {
          ...payload,
          creatorId: decodedJwt.id,
        })
      .then((res) => res.data);

    return NextResponse.json({
      result: {
        accessToken,
        created: result,
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
