import {NextRequest} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: NextRequest) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const carYearId = helper.getInputVariable('carYearId');
    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-trim/list/${carYearId}`)
      .then((res) => res.data);

    return helper.createResponse({ makes });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of car models', e);
  }
}

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { carYearId, name } = await helper.getPostPayload();

    if (!name) {
      return helper.missingFieldResponse('Car trim');
    }

    if (!carYearId || carYearId === 0) {
      return helper.missingFieldResponse('Car year ID');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-trim/create`,
        {
          creatorId: helper.getJwt().id,
          carYearId,
          name,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to create car model', e);
  }
}