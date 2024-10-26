import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    useEffect(()=>{
       axios.get(`${BACKEND_URL}me`,{
        headers:{Authorization:localStorage.getItem("token")}
       }).
       then(response =>{
        console.log(response);
        if(response.data.isloggedin === true){
            navigate("/blogs")
        }else{
            navigate("/signin")
        }
       })
    },[])
  return <div></div>
};

export default Home;
