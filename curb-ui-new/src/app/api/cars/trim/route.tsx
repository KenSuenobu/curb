import {NextRequest, NextResponse} from 'next/server';
import {verifyJwt} from '@/app/helpers/jwt';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const carYearId = searchParams.get('carYearId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-trim/list/${carYearId}`)
      .then((res) => res.data);

    return NextResponse.json({ makes }, { status: 200 });
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
    const { carYearId, name } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!name) {
      return NextResponse.json({
        message: 'Car trim is required'
      }, { status: 400 });
    }

    if (!carYearId || carYearId === 0) {
      return NextResponse.json({
        message: 'Car year ID is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-trim/create`,
        {
          creatorId: decodedJwt.id,
          carYearId,
          name,
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