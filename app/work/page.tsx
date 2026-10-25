import { Suspense } from "react"
import UsersData from "./_componants/UsersData"

const WorkPage = () => {
      

  return(
     <main className="container mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Users</h1>
<Suspense fallback="loading ....">

 <UsersData />
</Suspense>
       
    </main>
  )
}

export default WorkPage