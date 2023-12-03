import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function PUT(request: any) {
  const helper = new RouteHelper(request);

  try {
    if (!helper.isAuthorized()) {
      return helper.unauthorizedResponse();
    }

    const { oldPassword, newPassword } = await helper.getPostPayload();

    if (!oldPassword || !newPassword) {
      return helper.missingFieldResponse('Old and New Password');
    }

    const result = await axios.put(`${process.env.CURB_SERVER_URL}/user/profile`, {
      id: helper.getJwt().id,
      oldPassword: Buffer.from(oldPassword).toString('base64'),
      newPassword: Buffer.from(newPassword).toString('base64'),
    }).then((res) => {
      return res.data;
    });

    return helper.createResponse({
      result: {
        accessToken: helper.getAccessToken(),
        result,
      },
    });
  } catch (e) {
    return helper.createErrorResponse('Failed to save profile', e);
  }
}