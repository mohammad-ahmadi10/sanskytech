import { MarkDownPreviewerType } from "types/createblogtypes"
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';






const MarkdownPreviewer = ({value}:MarkDownPreviewerType) => {

  return (
    <div className=" text-black p-2 border-t-2 border-cyan-500 mt-1 bg-white ">
       {
        typeof value !== "undefined" ? 
        <MDXRemote {...value!.source} components={{Image}}/>
        :
        <div>There is nothing to show!</div>
       }
    </div>
  )
}



export default MarkdownPreviewer