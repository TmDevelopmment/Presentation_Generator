

import React, { Suspense } from 'react'
import CreatPageSkelton from './_components/CreatePage/CreatPageSkelton';
import RenderPage from './_components/RenderPage';

type Props = {}

const Page = (props: Props) => {
  return (
    <main className="w-full h-full p-6">
        <Suspense fallback={<CreatPageSkelton/>}>
        <RenderPage />
        </Suspense>
    </main>
  )
}

export default Page