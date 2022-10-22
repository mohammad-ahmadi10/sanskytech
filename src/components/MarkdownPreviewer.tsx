import { MarkDownPreviewerType } from "types/createblogtypes"
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';






const MarkdownPreviewer = ({value}:MarkDownPreviewerType) => {

  return (
    <div>

      <MDXRemote {...value!.source} components={{Image}}/>
    </div>
  )
}



export default MarkdownPreviewer