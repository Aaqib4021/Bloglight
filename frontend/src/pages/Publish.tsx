
import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateBlogInput } from "@aaqibba/common";
import { useNavigate } from "react-router-dom";
const Publish = () => {
    const [inputs ,setInputs]= useState<CreateBlogInput>({
        title:"",
        content:""
    })
    const navigate  = useNavigate();
  return <div>
        <Appbar/>
    <div className="p-20">
        <div>
        <div className="flex ">
            <button className="bg-green-500 text-white font-medium px-3 py-2 rounded-lg ml-auto" onClick={async()=>{
                const response = await axios.post(`${BACKEND_URL}api/v1/blog`,{
                    title:inputs.title,
                    content:inputs.content
                },{headers:{
                    Authorization:localStorage.getItem("token")
                }})
               if(response.data.id){
                navigate("/blogs")
               }
            }}>Publish</button>
        </div>


           <input type="text" placeholder="Title" onChange={(e)=>{
            setInputs({
                ...inputs,
                title:e.target.value
            })
           }} className="title w-full px-5 py-6 text-3xl font-medium font-serif outline-none"/>

            <div className="">
              <textarea onChange={(e)=>{
                setInputs({
                    ...inputs,
                    content:e.target.value
                })
              }} className="content w-full px-5 py-2 resize-none text-lg outline-none"  rows={12}  placeholder="Tell Your Story..."/>
            </div>
        </div>
    </div>
    </div>;

};

export default Publish;
