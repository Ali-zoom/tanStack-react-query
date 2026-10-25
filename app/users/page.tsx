'use client'

import { useState } from "react"
import PostList from "../Componants/PostList"
import PostSearchForm from "../Componants/PostSearchForm"
import SearchByTitle from "../Componants/SearchByTitle"


const page = () => {
   const[selectedValue,setSelectedValue]=useState("")
      const[queryTitle,setqueryTitle]=useState("")

  return (
   <>
<PostSearchForm selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
<SearchByTitle queryTitle={queryTitle} setqueryTitle={setqueryTitle}/>
   <PostList selectedValue={selectedValue} queryTitle={queryTitle} />
   </>
  )
}

export default page