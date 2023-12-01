import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetId = helper.getInputVariable('fleetId');
    const fleetCarId = helper.getInputVariable('fleetCarId');

    if (!fleetId && !fleetCarId) {
      return helper.missingFieldResponse('Fleet ID or Fleet Car ID');
    }

    if (fleetId) {
      const cars: any = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/list/fleet/${fleetId}`)
        .then((res) => res.data);

      return helper.createResponse({cars});
    } else {
      const cars: any = await axios.get(`${process.env.CURB_SERVER_URL}/fleet/get/fleet-car/${fleetCarId}`)
        .then((res) => res.data);

      return helper.createResponse({cars});
    }
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of fleet cars', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { fleetId, carTrimId } = await helper.getPostPayload();

    if (!fleetId) {
      return helper.missingFieldResponse('Fleet ID');
    }

    if (!carTrimId) {
      return helper.missingFieldResponse('Car Trim ID');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/fleet/create/car`, {
      fleetId,
      ownerId: helper.getJwt().id,
      carTrimId,
      data: {}
    }).then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create fleet car', e);
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
      return helper.missingFieldResponse('Payload for editing');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/fleet/save/car`, {
      ...payload,
    }).then((res) => {
      return res.data;
    });

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create fleet car', e);
  }
}