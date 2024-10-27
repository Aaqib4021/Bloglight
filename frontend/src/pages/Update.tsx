import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
const Update = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/update/:id");
            }else{
                navigate("/signin");
            }
           })
    },[])

    const [warning,setWarning] = useState("hidden")
    const {id} = useParams();
    const [updatedInputs ,setUpdatedInputs] = useState({
        id:Number(id),
        title:"",
        content:""
    });
async function sendrequest(){
    if(updatedInputs.title.length > 30 && updatedInputs.content.length > 100){
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
    }else{
        setWarning("block")
    }


}
  return <div>
    <Appbar/>
    <div className="p-20">
    <div className={`text-red-600 font-medium mb-2 ${warning}`}>Please write title atleast  of 40 characters and content of 100 characters</div>
        <div>
        <div className="flex ">
            <button className="bg-rose-600 text-white font-medium px-3 py-2 rounded-lg ml-auto" onClick={sendrequest}>Update</button>
        </div>
           <input type="text" placeholder="New Title"  minLength={30} required className="title w-full px-5 py-6 text-3xl font-medium font-serif outline-none" onChange={(e)=>{
            setUpdatedInputs({
                ...updatedInputs,
                title:e.target.value
            })
           }}/>

            <div className="">
              <textarea required minLength={100} className="content w-full px-5 py-2 resize-none text-lg outline-none"  rows={12}  placeholder="Share your thoughts and ideas... ✍️" onChange={(e)=>{
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
