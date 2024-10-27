import { Link } from "react-router-dom";

interface BlogCardProps {
    name: string;
    title: string;
    content: string;
    publishedDate: string;
    imageLink:string;
    id: number;
}

const BlogCard = ( {id,title,content,name,publishedDate,imageLink}: BlogCardProps) => {
  return<Link to={`/blog/${id}`}><div className=" mt-2 px-28">
    <div className="flex justify-between items-center p-4 border border-black">
        <div className="flex flex-col gap-2 w-[750px] ">
            <div className="flex gap-2 items-center">
                <div>
                    <Avatar name={name} size="small"/>
                </div>
                <div className="font-medium text-sm">{name}</div>
                <div className="font-medium text-sm text-[#DEB68C]"style={{ wordSpacing: '-2px' }}>{publishedDate}</div>
            </div>
            <div>
                <div className="font-bold text-2xl max-w-3xl border border-red-300 ">{title.slice(0,50)}...</div>
            </div>
            <div>
                <div className="text-[#3c2309] font-serif">{content.slice(0,200)}...</div>
            </div>
            <div>
                <div className="text-sm font-medium text-slate-500" style={{ wordSpacing: '-2px' }} >3 min read</div>
            </div>
        </div>
        <div className="max-w-80">
            <img src={imageLink}className=" rounded-lg" alt="blog-image"/>
        </div>
    </div>
  </div>
  </Link>
};

 const BlogCardUpdated = (BlogCard:React.FC<BlogCardProps>)=>{
    return function EnhancedBlogCard(props:BlogCardProps){
        const id = props.id
        return<div className=" mb-2">
        <BlogCard {...props}/>
        <div className="text-center">
           <Link to={`/update/${id}`}> <button className="bg-cyan-500 text-white px-3 py-1 rounded-lg">Update</button></Link>
        </div>
    </div>
    }
}
export const EnhancedBlogCard = BlogCardUpdated(BlogCard);


export const Avatar = ({name,size}:{name:string,size?:"small"| "big"})=>{
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-700 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-semibold text-gray-600 dark:text-gray-300`}>
        {size === "big" ?"🐺":name[0]}
    </span>
</div>

}
export default BlogCard;
