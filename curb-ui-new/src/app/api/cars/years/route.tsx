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

    const carModelId = helper.getInputVariable('carModelId');
    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-year/list/${carModelId}`)
      .then((res) => res.data);

    return helper.createResponse({ makes });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of car years', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { carModelId, year } = await helper.getPostPayload();

    if (!year) {
      return helper.missingFieldResponse('Car year');
    }

    if (!carModelId || carModelId === 0) {
      return helper.missingFieldResponse('Car model ID');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-year/create`,
      {
        creatorId: helper.getJwt().id,
        carModelId,
        year: parseInt(year),
      })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create car year', e);
  }
}