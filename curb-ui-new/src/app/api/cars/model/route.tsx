import {verifyJwt} from '@/app/helpers/jwt';
import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const carMakeId = searchParams.get('carMakeId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-model/list/${carMakeId}`)
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
    const { carMakeId, model } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!model) {
      return NextResponse.json({
        message: 'Car model is required'
      }, { status: 400 });
    }

    if (!carMakeId || carMakeId === 0) {
      return NextResponse.json({
        message: 'Car make ID is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-model/create`,
        {
          creatorId: decodedJwt.id,
          carMakeId,
          name: model,
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