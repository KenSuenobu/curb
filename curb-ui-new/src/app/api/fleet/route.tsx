import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    const fleets = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/list/${decodedJwt.id}`)
      .then((res) => res.data);

    return NextResponse.json({ fleets }, { status: 200 });
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
    const { fleet } = await request.json();
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);

    if (!fleet) {
      return NextResponse.json({
        message: 'Fleet name is required'
      }, { status: 400 });
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/fleet/${decodedJwt.id}`,
        {
          creatorId: decodedJwt.id,
          name: fleet,
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