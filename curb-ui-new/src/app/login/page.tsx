import LoginForm from '@/app/components/LoginForm';

const Login = () => {
  return (
    <main className={'flex h-screen'}>
      <div className={'w-1/3 flex justify-center items-center'}>
        <LoginForm />
      </div>
      <div className={'w-2/3 bg-[#0f0f16] flex items-center justify-center'}>
        {/*// Login image*/}
      </div>
    </main>
  );
}

export default Login;