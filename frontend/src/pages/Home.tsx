import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        try{
            axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/blogs");
            }else{
                navigate("/signin");
            }
           })}
           catch (e: unknown) {
            if (e instanceof Error) {
                alert(`Something went wrong: ${e.message}`);
            } else {
                alert(`Something went wrong: ${String(e)}`); // Fallback for non-Error types
            }
        }

    },[])
  return <div></div>
};

export default Home;
