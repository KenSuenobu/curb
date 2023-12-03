import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { payload } = await helper.getPostPayload();

    if (!payload) {
      return helper.missingFieldResponse('Trip payload');
    }

    await axios.post(`${process.env.CURB_SERVER_URL}/trip/create`,
      {
        ...payload,
      });

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create trip', e);
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
      return helper.missingFieldResponse('Trip payload');
    }

    await axios.put(`${process.env.CURB_SERVER_URL}/trip/edit`,
      {
        ...payload,
      });

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save trip changes', e);
  }
}

export async function GET(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const fleetCarId = helper.getInputVariable('fleetCarId');
    const tripId = helper.getInputVariable('tripId');

    if (!fleetCarId && !tripId) {
      return helper.missingFieldResponse('Fleet Car ID and Trip ID');
    }

    if (fleetCarId) {
      const trips: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/list/car/${fleetCarId}`)
        .then((res) => res.data);

      return helper.createResponse({ trips });
    } else {
      const trip: any = await axios.get(`${process.env.CURB_SERVER_URL}/trip/${tripId}`)
        .then((res) => res.data);

      return helper.createResponse({ trip });
    }
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of trips', e);
  }
}

export async function DELETE(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const tripId = helper.getInputVariable('tripId');

    if (!tripId) {
      return helper.missingFieldResponse('Trip ID');
    }

    const result: any = await axios.delete(`${process.env.CURB_SERVER_URL}/trip/${tripId}`)
      .then((res) => res.data);

    return helper.createResponse({ result });
  } catch (e) {
    return helper.createErrorResponse('Failed to delete trip', e);
  }
}
