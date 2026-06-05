

import React, { Suspense } from 'react'
import CreatPageSkelton from './_components/CreatePage/CreatPageSkelton';
import RenderPage from './_components/RenderPage';
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const Page = async () => {

  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) {
    redirect("/login");
  }

  if (!checkUser.user.subscription) {
    redirect("/dashboard");
  }

  return (
    <main className="w-full h-full p-6">
        <Suspense fallback={<CreatPageSkelton/>}>
        <RenderPage />
        </Suspense>
    </main>
  )
}

export default Page