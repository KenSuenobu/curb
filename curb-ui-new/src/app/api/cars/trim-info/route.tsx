import {NextRequest, NextResponse} from 'next/server';
import {verifyJwt} from '@/app/helpers/jwt';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: NextRequest) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const carTrimId = helper.getInputVariable('carTrimId');
    const data = await axios.get(`${process.env.CURB_SERVER_URL}/car-trim-info/get/${carTrimId}`)
      .then((res) => res.data);

    return helper.createResponse({ ...data });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of car trims', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { carTrimId, data } = await helper.getPostPayload();

    if (!data) {
      return helper.missingFieldResponse('Car trim info');
    }

    if (!carTrimId || carTrimId === 0) {
      return helper.missingFieldResponse('Car trim ID');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-trim-info/create`,
        {
          creatorId: helper.getJwt().id,
          carTrimId,
          data,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create car trim', e);
  }
}

export async function PUT(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { carTrimId, data } = await helper.getPostPayload();
    const carTrimInfoId = helper.getInputVariable('carTrimInfoId');

    if (!data) {
      return helper.missingFieldResponse('Car trim info');
    }

    if (!carTrimId || carTrimId === 0) {
      return helper.missingFieldResponse('Car trim ID');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/car-trim-info/edit/${carTrimInfoId}`,
      {
        carTrimId,
        data,
      })
    .then((res) => res.data);

    return helper.createResponse({
      result: {
        ...result,
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save car trim', e);
  }
}