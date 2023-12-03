import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const guestId = helper.getInputVariable('guestId');

    if (!guestId) {
      return helper.missingFieldResponse('Guest ID');
    }

    const guest = await axios.get(`${process.env.CURB_SERVER_URL}/guest/get/${guestId}`)
      .then((res) => res.data);

    return helper.createResponse({ guest });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of guests', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { payload } = await helper.getPostPayload();

    if (!payload) {
      return helper.missingFieldResponse('Payload');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/guest/create`,
        {
          ...payload,
          creatorId: helper.getJwt().id,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
        created: result,
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create guest record', e);
  }
}

export async function PUT(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { payload } = await helper.getPostPayload();

    if (!payload) {
      return helper.missingFieldResponse('Payload');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/guest/edit`,
        {
          ...payload,
          creatorId: helper.getJwt().id,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
        created: result,
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save guest record', e);
  }
}
