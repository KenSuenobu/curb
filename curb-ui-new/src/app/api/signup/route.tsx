import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: any) {
  try {
    const {emailAddress, ipAddress, source, note} = await request.json();

    if (!emailAddress || !source || !note) {
      return NextResponse.json({
        message: 'Email Address, source, and note fields are required'
      }, { status: 400 });
    }

    if (emailAddress.indexOf('@') === -1) {
      return NextResponse.json({
        message: 'The E-Mail address you provided is malformed.  Please check the email address.'
      }, { status: 400 });
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
      return NextResponse.json({
        message: 'Thank you, your request has been submitted, and you will be contacted soon.',
      }, { status: 201 });
    } else {
      return NextResponse.json({
        message: 'Failed to register, possibly a duplicate or invalid registration request',
      }, { status: 500 });
    }
  } catch(e) {
    console.error(e);
    return NextResponse.json({
      message: 'Something went wrong while trying to register',
      result: e
    }, {
      status: 500,
    });
  }
}
