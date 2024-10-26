
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Blog from "./pages/Blog";
import UserBlogs from "./pages/UserBlogs";
import Update from "./pages/Update";
import Home from "./pages/Home";


function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/blog/:id" element={<Blog/>}/>
            <Route path="/publish" element={<Publish/>}/>
            <Route path="/userblogs" element={<UserBlogs/>}/>
            <Route path="/update/:id" element={<Update/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
