import { MarkDownPreviewerType } from "types/createblogtypes"
import { MDXRemote } from 'next-mdx-remote';
import Image from './../utils/Image';
import YouTube from './../utils/Youtube';






const MarkdownPreviewer = ({value}:MarkDownPreviewerType) => {

  return (
    <div className={`text-black p-2 py-5 border-t border-black dark:border-slate-200 bg-white border border-slate-800 border-solid 
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