
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateBlogInput } from "@aaqibba/common";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import {ref, uploadBytes , getDownloadURL} from "firebase/storage";

const Publish = () => {
    const [warning,setWarning] = useState("hidden");
    const [imagewarning,setImageWarning] = useState("hidden");
    const [fileName, setFileName] = useState("No Image chosen");
    const [inputs ,setInputs]= useState<CreateBlogInput>({
        title:"",
        content:"",
        published:true,
        imageLink:""
    })
    const navigate  = useNavigate();
    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file =  event.target.files?.[0];
       if(file){
        setFileName(file.name);
        uploadImage(file)
       }
      };

      const uploadImage = async (file:File)=>{
        const storageRef = ref(storage, `images/${file.name}`);
        try{
            await uploadBytes(storageRef,file);
            const url = await getDownloadURL(storageRef);
            setInputs({
                ...inputs,
                imageLink:url
            })
        } catch (e:unknown) {
            if (e instanceof Error) {
                alert(`Something went wrong: ${e.message}`);
            } else {
                alert(`Something went wrong: ${String(e)}`); // Fallback for non-Error types
            }
        }
      }

    useEffect(()=>{
        axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/publish");
            }else{
                navigate("/signin");
            }
           })
    },[])

  return <div>
        <Appbar/>
    <div className="p-20 ">
    <div className={`text-red-600 font-medium mb-2 ${warning}`}>Please write title atleast  of 40 characters and content of 100 characters</div>
    <div className={`text-red-600 font-medium mb-2 ${imagewarning}`}>Please upload an image for your blog OR your image is uploading Please wait...</div>
        <div>
        <div className="flex flex-col gap-3 sm:gap-0  sm:flex-row text-white font-medium items-center justify-between">
            <button className="bg-green-500 text-white font-medium px-3 py-2 rounded-lg " onClick={async()=>{
                if(inputs.title.length > 30 && inputs.content.length > 100){
                    setWarning("hidden")
                    if(inputs.imageLink){
                        const response = await axios.post(`${BACKEND_URL}api/v1/blog`,{
                            title:inputs.title,
                            content:inputs.content,
                            published:true,
                            imageLink:inputs.imageLink
                        },{headers:{
                            Authorization:localStorage.getItem("token")
                        }})
                       if(response.data.id){
                        navigate("/blogs")
                       }
                    }else{
                        setImageWarning("block")
                    }

                }else{
                    setWarning("block")
                }

            }}>Publish</button>

             <div className="bg-indigo-700 flex items-center ml-4 text-sm">
                <input type="file" id="fileInput" className="sm:max-w-24 opacity-0 absolute" onChange={handleFileChange}/>
                <label htmlFor="fileInput" className="sm:px-3 py-1 inline-block mr-2">|Upload image|</label>
                <span className="sm:ml-2 sm:text-gray-700 text-black bg-white py-2 inline-block ">{fileName}</span>
            </div>


        </div>
           <input type="text" placeholder="Title" minLength={30} required onChange={(e)=>{
            setInputs({
                ...inputs,
                title:e.target.value
            })
           }} className="title w-full px-5 py-6 text-3xl font-medium font-serif outline-none"/>

            <div className="">
              <textarea required minLength={100} onChange={(e)=>{
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
