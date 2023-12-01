import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const dashboard = await axios.get(`${process.env.CURB_SERVER_URL}/dashboard/list/${helper.getJwt().id}`)
      .then((res) => res.data);

    return helper.createResponse({ dashboard });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve dashboard', e);
  }
}
