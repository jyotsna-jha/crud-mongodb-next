"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const router=useRouter();

const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!title || !description){
    alert("Title and description are required.")
    return;
  }

  try{
    const res=await fetch('http://localhost:3000/api/topics',{ // sending post req to this url
                                                               // with title and description as request body in json format
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({title,description}) //convert js object into json string to be sent as the body of the http req
    });

    if(res.ok){
      router.push('/'); // if the req is successful, the user is redirected to the homepage
    }
    else{
      throw new Error('Failed to create a topic');
    }

  }catch(error){
    console.log(error);
  }

}
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        className='border border-slate-500 px-8 py-2'
        type='text'
        placeholder='Topic Title'
        />
        <input
        onChange={(e)=>setDescription(e.target.value)}
        value={description}
        className='border border-slate-500 px-8 py-2'
        type='text'
        placeholder='Topic Description'
        />
        <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
    </form>
  )
}

export default page;
