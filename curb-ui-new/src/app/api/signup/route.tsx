import axios from 'axios';
import RouteHelper from '@/app/components/routes/RouteHelper';

export async function POST(request: any) {
  const helper = new RouteHelper(request);

  try {
    const {emailAddress, ipAddress, source, note} = await helper.getPostPayload();

    if (!emailAddress || !source || !note) {
      return helper.missingFieldResponse('Email Address, Source, Note');
    }

    if (emailAddress.indexOf('@') === -1) {
      return helper.createErrorResponse('The E-Mail address you provided is malformed.  Please check the email address.', null, 400);
    }

    const response = await axios.post(`${process.env.CURB_SERVER_URL}/signup/create`, {
      emailAddress,
      ipAddress,
      source,
      note,
    })
      .then((x) => x.data)
      .catch((x) => {
        console.log('Error', x);
        return null;
      });

    if (response) {
      return helper.createMessageResponse('Thank you, your request has been submitted, and you will be contacted soon.', 201);
    } else {
      return helper.createMessageResponse('Failed to register, possibly a duplicate or invalid registration request', 500);
    }
  } catch(e) {
    return helper.createErrorResponse('Something went wrong while trying to register', e);
  }
}
