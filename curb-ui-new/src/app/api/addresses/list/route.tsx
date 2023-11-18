import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any, fleetId: number) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const fleetId = searchParams.get('fleetId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    if (!fleetId) {
      return NextResponse.json({
        message: 'Fleet ID is required',
      }, { status: 404 });
    }

    const addresses = await axios.get(`${process.env.CURB_SERVER_URL}/address/list/${fleetId}`)
      .then((res) => res.data);

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (e) {
    console.error('Unable to get list of car makes', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of car makes',
      result: e,
    }, { status: 500 });
  }
}
