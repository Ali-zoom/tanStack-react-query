import { Suspense } from "react"
import AddUserForm from "./_componants/AddUserForm"
import ListUsers from "./_componants/ListUsers"



const AddUserPage = () => {
    
  return (
<div>
        <AddUserForm/>

        <ListUsers/>
</div>
    
    
  )
}

export default AddUserPage