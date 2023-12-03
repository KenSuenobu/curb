import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetId = helper.getInputVariable('fleetId');

    const trips: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/list/past/${fleetId}`)
      .then((res) => res.data);

    return helper.createResponse({ trips });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of past trips', e);
  }
}
