import  { Suspense } from 'react'
import UserDetails from './_componants/UserDetails'

const UserDetailsPage = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading from suspense...</div>}>
                <UserDetails/>

        </Suspense>
    </div>
  )
}

export default UserDetailsPage