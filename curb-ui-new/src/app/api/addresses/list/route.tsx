import {NextResponse} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any, fleetId: number) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetId = helper.getInputVariable('fleetId');

    if (!fleetId) {
      return helper.missingFieldResponse('fieldId');
    }

    const addresses = await axios.get(`${process.env.CURB_SERVER_URL}/address/list/${fleetId}`)
      .then((res) => res.data);

    return helper.createResponse({ addresses });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of car makes', e);
  }
}
