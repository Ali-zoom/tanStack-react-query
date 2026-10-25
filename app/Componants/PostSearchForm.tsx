import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints'
import React, { Dispatch, SetStateAction } from 'react'
interface SearchProps{
 selectedValue:string,
    setSelectedValue:Dispatch<SetStateAction<string>>
}

const PostSearchForm = ({selectedValue,setSelectedValue}:SearchProps) => {
const inputOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    setSelectedValue(e.target.value)

}
  return (
    <div className='w-full max-w-xl mx-auto my-5 bg-blue-300 text-black'>
        <form  className='grid ' >
            <input onChange={inputOnChange} value={selectedValue}  className='border border-black mb-1' type='text' placeholder='enter user id'/>
            <button type='submit' onSubmit={(e)=>e.preventDefault()}>submit</button>
        </form>
    </div>
  )
}

export default PostSearchForm