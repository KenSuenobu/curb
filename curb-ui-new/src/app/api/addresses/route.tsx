import {verifyJwt} from '@/app/helpers/jwt';
import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const addressId = searchParams.get('addressId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const address = await axios.get(`${process.env.CURB_SERVER_URL}/address/get/${addressId}`)
      .then((res) => res.data);

    return NextResponse.json({ address }, { status: 200 });
  } catch (e) {
    console.error('Unable to get list of car models', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of car models',
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
        message: 'Address payload is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/address/create`,
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

export async function PUT(request: any) {
  try {
    const { payload } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!payload) {
      return NextResponse.json({
        message: 'Payload data is required'
      }, { status: 400 });
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/address/edit`,
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