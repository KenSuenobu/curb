import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET(request: any) {
  try {
    const accessToken = request.headers.get('Authorization');
    const decodedJwt = verifyJwt(accessToken);

    console.log(`AccessToken=${accessToken} decodedJwt=${JSON.stringify(decodedJwt, null, 2)}`);

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
