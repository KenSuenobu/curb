import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt: any = verifyJwt(accessToken);
    const searchParams = request.nextUrl.searchParams;
    const fleetId = searchParams.get('fleetId');

    if (!accessToken || !decodedJwt) {
      return NextResponse.json({
        message: 'Unauthorized',
      }, { status: 401 });
    }

    if (!fleetId) {
      return NextResponse.json({
        message: 'Fleet ID is missing',
      }, { status: 404 });
    }

    const guests: any = await axios.get(`${process.env.CURB_SERVER_URL}/guest/list-all/${fleetId}`)
      .then((res) => res.data);

    return NextResponse.json({guests}, {status: 200});
  } catch (e) {
    console.error('Unable to get list of cars for fleet', e);
    return NextResponse.json({
      message: 'Failed to retrieve list of fleet cars',
      result: e,
    }, { status: 500 });
  }
}
