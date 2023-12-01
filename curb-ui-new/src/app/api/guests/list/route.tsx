import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetId = helper.getInputVariable('fleetId');
    const blacklisted = helper.getInputVariable('blacklisted');

    if (!fleetId) {
      return helper.missingFieldResponse('Fleet ID');
    }

    const guests: any = await axios.get(`${process.env.CURB_SERVER_URL}/guest/list-all/${fleetId}/${blacklisted}`)
      .then((res) => res.data);

    return helper.createResponse({ guests });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve guest list', e);
  }
}
