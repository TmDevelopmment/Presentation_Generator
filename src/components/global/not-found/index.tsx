import React from 'react'
import { Earth } from 'lucide-react'

type Props = {}

const NotFound = (props: Props) => {
  return (
    <div className="w-full h-50 flex flex-col items-center justify-center gap-4">
        <Earth className="w-16 h-16 text-secondary animate-spin" />
        <h1 className="text-2xl font-semibold dark:text-primary">Nothing to see here</h1>
        <p className="text-base font-normal dark:text-white">The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound