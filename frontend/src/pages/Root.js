import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import {useEffect} from 'react';
import { getTokenDuration } from '../util/auth';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(()=>{
    if (!token) {
      return;
    }

    setTimeout(()=>{
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration)

    if(token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const tokenDuration = getTokenDuration();

  },[token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
