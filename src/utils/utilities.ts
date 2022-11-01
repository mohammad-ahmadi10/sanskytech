
import { Post } from '@/types/createblogtypes';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight  from 'rehype-highlight';
import  rehypeSlug  from 'rehype-slug';
import  rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import { SelectionType } from '@/types/createblogtypes';
import { RefObject } from 'react';


// seperating actual content and its metadata
export const preparePost = ( source:string): Post =>{
    const {content , data} = matter(source);
    return {
        content,
        metadata:{
            excerpt: data.excerpt ?? "",
            title: data.title ?? "" ,
            tags: (data.tags ?? []).sort(),
            date: (data.date ?? new Date()).toString(),
          }
      }
}


export const createMDXPost = async (source:string) =>{
    const {content , metadata}  = preparePost(source);
        const mdxSource = await serialize(content , {
          mdxOptions:{
              rehypePlugins: [
                  rehypeHighlight,
                  rehypeSlug , 
                  [rehypeAutoLinkHeadings , {behaviour: "wrap"} ],
              ]
          }
      });
      return {source:mdxSource , metadata};
}

// seperate before & after section + selected area of the text
export const beforeAfterSelection = ({value , selectionStart , selectionEnd }:SelectionType) =>{
    const beforeSelection = value.substring(0 , selectionStart);
    const afterSelection = value.substring(selectionEnd);
    const selectedText = value.substring(selectionStart , selectionEnd);
    return {selectedText ,beforeSelection , afterSelection};
  }


  /* checking if a ref exists */
  export const exsitsRef = (ref:RefObject<HTMLElement>) =>{
    return ref && ref.current;
  }


  // check if text is not empty
  export const isSelectedTextEmpty = (text:string) => text.length === 0;

  // select the given a part of a text with the given from and to index
  export const selectText = (textAreaRef: RefObject<HTMLTextAreaElement>, from:number,to:number) =>{
    textAreaRef.current!.setSelectionRange(from , to);
    textAreaRef.current!.focus();
  }
