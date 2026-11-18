import {Header} from '@/components/ui/web/Header/Header'
import React, { Suspense } from 'react'

const DashbordPage = () => {
  return (

    <div>
        <h1>Dashboard</h1>
        <Suspense fallback="Loading...">
            <Header />
        </Suspense>
    </div>
  )
}

export default DashbordPage