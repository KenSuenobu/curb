import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetCarId = helper.getInputVariable('fleetCarId');

    if (!fleetCarId) {
      return helper.missingFieldResponse('Fleet Car ID');
    }

    const loan: any = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/loan/${fleetCarId}`)
      .then((res) => res.data);

    return helper.createResponse({...loan});
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of loans', e);
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
      return helper.missingFieldResponse('Car Loan Payload');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/loan`, {
      ...payload,
    }).then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create car loan entry', e);
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
      return helper.missingFieldResponse('Car Loan Payload');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/fleet/save/loan`, {
      ...payload,
    }).then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save car loan entry', e);
  }
}
