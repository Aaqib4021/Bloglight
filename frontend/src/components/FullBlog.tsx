import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import { Phrases } from "./Phrases";

const FullBlog = ({ blog }:{blog:Blog} ) => {
  return <div className="p-8">
    {blog &&
    <div className="flex justify-between items-center p-4 border-2">
        <div className="max-w-4xl border">
            <div className="font-bold text-3xl">{blog.title}</div>
            <div className="my-2 text-slate-800 font-medium font-serif">{blog.content}</div>
            <div className="font-medium ">{`Posted by ${blog.author.name || "Anonymous"}`}</div>
        </div>
        <div className="px-3 max-w-lg border">
            <div className="flex items-center gap-2 ">
            <div>
                <Avatar size="small" name={`${blog.author.name || "Anonymous"}`}/>
            </div>
            <div className="font-semibold text-[#885927] text-3xl">{`${blog.author.name || "Anonymous"}`}</div>
            </div>

            <div className="mt-3  text-gray-700 ">
                <Phrases/>
            </div>
        </div>
    </div>
    }

  </div>;
};

export default FullBlog;
