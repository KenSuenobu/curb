import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';
import {usePathname} from 'next/navigation';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetId = helper.getInputVariable('fleetId');

    const trips: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/list/current/${fleetId}`)
        .then((res) => res.data);

    return helper.createResponse({ trips });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve current list of trips', e);
  }
}
