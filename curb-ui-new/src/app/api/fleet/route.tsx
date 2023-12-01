import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleets = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/list/${decodedJwt.id}`)
      .then((res) => res.data);

    return helper.createResponse({ fleets });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve fleet list', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { fleet } = await helper.getPostPayload();

    if (!fleet) {
      return helper.missingFieldResponse('Fleet name');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/fleet/${decodedJwt.id}`,
        {
          creatorId: helper.getJwt().id,
          name: fleet,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create fleet record', e);
  }
}