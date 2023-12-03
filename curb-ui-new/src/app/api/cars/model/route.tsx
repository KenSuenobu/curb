import {NextRequest} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: NextRequest) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const carMakeId = helper.getInputVariable('carMakeId');
    const makes = await axios.get(`${process.env.CURB_SERVER_URL}/car-model/list/${carMakeId}`)
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

    const { carMakeId, model } = await request.json();

    if (!model) {
      return helper.missingFieldResponse('Car Model');
    }

    if (!carMakeId || carMakeId === 0) {
      return helper.missingFieldResponse('Car Make ID');
    }

    const result = await axios.post(`${process.env.CURB_SERVER_URL}/car-model/create`,
        {
          creatorId: helper.getJwt().id,
          carMakeId,
          name: model,
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