'use client';

import {useEffect, useState} from 'react';
import {getAllMakes} from '@/app/services/car-definitions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const GetMakes = () => {
  const [ makesList, setMakesList ] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    getAllMakes(session?.user.accessToken)
      .then((res) => {
        setMakesList(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [session]);

  return (
    <div>
      {JSON.stringify(makesList)}
      <p/>
      <Link href={'/'} className={'text-blue-300 hover:underline uppercase'}>Back to homepage</Link>
    </div>
  )
}

export default GetMakes;