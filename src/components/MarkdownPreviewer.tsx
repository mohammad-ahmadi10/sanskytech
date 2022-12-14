import { MarkDownPreviewerType } from "types/createblogtypes"
import { MDXRemote } from 'next-mdx-remote';
import Image from './../utils/Image';
import YouTube from './../utils/Youtube';






const MarkdownPreviewer = ({value}:MarkDownPreviewerType) => {

  return (
    <div className={`text-black p-2 border-t-2 border-cyan-500 mt-4 bg-white border border-slate-900 border-solid border-t-0 
                     dark:text-white dark:bg-black`}>
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