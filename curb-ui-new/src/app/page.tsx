import Image from 'next/image'
import LogoutButton from '@/app/components/LogoutButton';
import {getAllMakes} from '@/app/services/car-definitions';
import MakesForm from '@/app/components/cars/MakesForm';

export default function Home() {
  return (
    <main
      className={'bg-black flex flex-col justify-center items-center space-y-8 h-screen'}>
      <h1
        className={'text-white text-center text-2xl font-bold uppercase'}>
        You have logged in!
      </h1>
      <p/>
      <LogoutButton/>
      <p/>

    </main>
  );
}
