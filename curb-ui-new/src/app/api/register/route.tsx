import RouteHelper from '@/app/components/routes/RouteHelper';

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    const {email, password} = await helper.getPostPayload();

    if (!email || !password) {
      return helper.missingFieldResponse('Email and Password');
    }

    return helper.createResponse({
      message: 'Account created',
    });
  } catch(e) {
    return helper.createErrorResponse('Something went wrong while trying to register', e);
  }
}
