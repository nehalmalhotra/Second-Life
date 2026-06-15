'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SECOND_LIFE_ROUTES = ['/marketplace', '/product', '/confirmed']

export default function TitleManager() {
  const pathname = usePathname()

  useEffect(() => {
    const isSecondLife = SECOND_LIFE_ROUTES.some((route) => pathname.startsWith(route))
    document.title = isSecondLife ? 'Second Life' : 'Online Shopping'
  }, [pathname])

  return null
}
