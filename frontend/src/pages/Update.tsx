import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
const Update = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [updatedInputs ,setUpdatedInputs] = useState({
        id:Number(id),
        title:"",
        content:""
    });
async function sendrequest(){
    const response = await axios.put(`${BACKEND_URL}api/v1/blog`,{
        id:updatedInputs.id,
        title:updatedInputs.title,
        content:updatedInputs.content
    },{headers:{
        Authorization:localStorage.getItem("token")
    }});
    if(response.data.msg === "updated successfully"){
        navigate(`/blog/${id}`)
    }

}
  return <div>
    <Appbar/>
    <div className="p-20">
        <div>
        <div className="flex ">
            <button className="bg-rose-600 text-white font-medium px-3 py-2 rounded-lg ml-auto" onClick={sendrequest}>Update</button>
        </div>
           <input type="text" placeholder="New Title" className="title w-full px-5 py-6 text-3xl font-medium font-serif outline-none" onChange={(e)=>{
            setUpdatedInputs({
                ...updatedInputs,
                title:e.target.value
            })
           }}/>

            <div className="">
              <textarea className="content w-full px-5 py-2 resize-none text-lg outline-none"  rows={12}  placeholder="Share your thoughts and ideas... ✍️" onChange={(e)=>{
            setUpdatedInputs({
                ...updatedInputs,
                content:e.target.value
            })
           }}/>
            </div>
        </div>
    </div>
    </div>;
};

export default Update;
