import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
    const navigate = useNavigate()

  return <div className="flex justify-between mt-3 px-6 font-mono">
        <Link to="/blogs">
        <div className="font-bold text-3xl text-[#242424] cursor-pointer">
            Bloglight
        </div>
        </Link>
        <div className="flex items-center gap-4">
            <Link to="/userblogs">
            <div className="bg-green-600 text-white px-3 py-1 font-medium rounded-lg ">
                <button>My Blogs</button>
            </div>
            </Link>
            <div>
               <Link to="/publish"> <button className="px-3 py-1 bg-blue-700 text-white font-medium rounded-md ">📝New</button></Link>
            </div>
            <div>
                <Avatar name="Aaqib" size="big"/>

            </div>
            <div>
                <button className="bg-red-700 px-3 py-1 text-white font-medium rounded-lg" onClick={()=>{
                    localStorage.setItem("token","")
                    navigate("/signin")
                }}>Log out</button>
            </div>
        </div>

  </div>;
};

export default Appbar;
