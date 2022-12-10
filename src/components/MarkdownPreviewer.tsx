import { MarkDownPreviewerType } from "types/createblogtypes"
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import YouTube from './../utils/Youtube';






const MarkdownPreviewer = ({value}:MarkDownPreviewerType) => {

  return (
    <div className=" text-black p-2 border-t-2 border-cyan-500 mt-1 bg-white  border border-slate-900 border-solid border-t-0">
       {
        typeof value !== "undefined" ? 
        <MDXRemote {...value!.source} components={{Image, YouTube}}/>
        :
        <div>There is nothing to show!</div>
       }
    </div>
  )
}



export default MarkdownPreviewer