import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';
import {usePathname} from 'next/navigation';

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

    const trips: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/list/current/${fleetId}`)
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
