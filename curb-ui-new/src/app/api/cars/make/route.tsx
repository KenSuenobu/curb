import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-make/list`)
      .then((res) => res.data);

    return helper.createResponse({ makes });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of car makes', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { make } = await helper.getPostPayload();

    if (!make) {
      return helper.missingFieldResponse('Car make');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-make/create`,
      {
        creatorId: helper.getJwt().id,
        name: make,
      })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Unable to create car make', e);
  }
}