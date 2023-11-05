import {NextRequest, NextResponse} from 'next/server';
import {verifyJwt} from '@/app/helpers/jwt';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const carTrimId = searchParams.get('carTrimId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const data = await axios.get(`${process.env.CURB_SERVER_URL}/car-trim-info/get/${carTrimId}`)
      .then((res) => res.data);

    return NextResponse.json({ ...data }, { status: 200 });
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
    const { carTrimId, data } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!data) {
      return NextResponse.json({
        message: 'Car trim info is required'
      }, { status: 400 });
    }

    if (!carTrimId || carTrimId === 0) {
      return NextResponse.json({
        message: 'Car trim ID is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-trim-info/create`,
        {
          creatorId: decodedJwt.id,
          carTrimId,
          data,
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
    const { carTrimId, data } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const carTrimInfoId = searchParams.get('carTrimInfoId');

    if (!data) {
      return NextResponse.json({
        message: 'Car trim info is required'
      }, { status: 400 });
    }

    if (!carTrimId || carTrimId === 0) {
      return NextResponse.json({
        message: 'Car trim ID is required'
      }, { status: 400 });
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/car-trim-info/edit/${carTrimInfoId}`,
      {
        carTrimId,
        data,
      })
    .then((res) => res.data);

    return NextResponse.json({
      result: {
        ...result,
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