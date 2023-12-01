import {verifyJwt} from '@/app/helpers/jwt';
import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function GET(request: NextRequest) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const addressId = helper.getInputVariable('addressId');
    const address = await axios.get(`${process.env.CURB_SERVER_URL}/address/get/${addressId}`)
      .then((res) => res.data);

    return helper.createResponse({ address });
  } catch (e) {
    return helper.createErrorResponse('Failed to retrieve list of addresses', e);
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
      return helper.missingFieldResponse('Address payload');
    }

    await axios.post(`${process.env.CURB_SERVER_URL}/address/create`,
      {
        ...payload,
      })
    .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save new address', e);
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
      return helper.missingFieldResponse('Payload data');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/address/edit`,
        {
          ...payload,
        })
      .then((res) => res.data);

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
      },
    }, 201);
  } catch (e) {
    return helper.createErrorResponse('Failed to save address changes', e);
  }
}