import { Link } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "@aaqibba/common";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

const Auth = ({ type } : { type: "signup" | "signin" }) => {
const [warning ,setWarning] =useState("hidden")
const navigate = useNavigate();
const [inputs,setInputs]=useState<SignupInput>({
    name:"",
    email:"",
    password:""
});
async function sendRequest(){
    const response = await axios.post(`${BACKEND_URL}api/v1/user/${type}`,{
        name:inputs.name,
        email:inputs.email,
        password:inputs.password
    });
    if(response.data.jwt){
        localStorage.setItem("token",`Bearer ${response.data.jwt}`)
        navigate("/blogs")
    }else{
        setWarning("block")
    }

}
return <div className="h-screen  flex flex-col justify-center  font-mono">
    <div className="flex justify-center">

        <div className=" md:w-[500px]">
            <div>
                <div className="font-bold text-4xl text-center tracking-wide">{type === "signup" ? "Create an Account" : "Login to Your Account"}</div>
                <div className="text-lg mt-2 font-medium text-slate-500 text-center tracking-wide">{type === "signup" ? "Already have an account?":"Don't have an account?"}
                    <Link to={type === "signup" ?"/signin" :"/signup"} className="underline pl-2">{type==="signup" ? "signin" :"signup"}</Link>
                </div>
            </div>
            <div className="mt-4">
                <div>
                    {type === "signup" ? <LabelledInput label="Username" placeholder="Enter your username" type="text"  onChange={(e)=>{
                        setInputs({
                            ...inputs,
                            name:e.target.value
                        })
                    }}/>:null}

                    <LabelledInput label="Email" placeholder="john@gmail.com" type="email" onChange={(e)=>{
                        setInputs({
                            ...inputs,
                            email:e.target.value
                        })
                    }}/>
                    <LabelledInput label="Password" placeholder="john@123.." type="password"onChange={(e)=>{
                        setInputs({
                            ...inputs,
                            password:e.target.value
                        })
                    }}/>
                    <button className="bg-green-700 text-white px-3 py-2 rounded-lg w-full font-medium mt-4" onClick={sendRequest}>{type === "signup" ?"Sign Up" :"Sign In"}</button>
                    <div className={`text-red-600 font-medium ${warning}`}>Check your inputs ? Email or password is incorrect</div>
                </div>
            </div>
        </div>
    </div>
  </div>;
};

export default Auth;
