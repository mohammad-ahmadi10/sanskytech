
import { MDXRemoteSerializeResult } from 'next-mdx-remote';


export interface SelectionType{
    value:string , selectionStart:number , selectionEnd:number
  }
  
export interface EditorType {
    onEdit: (value:string) => void
    value: string
}

export interface MarkDownPreviewerType{
  value?:MDXPost
}

export interface MDXPost{
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>,
  metadata:PostMetadata
}
export interface Post {
  content: string,
  metadata: PostMetadata
}
export interface PostMetadata{
  title:string ,
  tags: string[],
  date: Date,
  excerpt:string 
}