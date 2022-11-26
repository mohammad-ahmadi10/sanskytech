
import { CommandType, Post, textRef } from '@/types/createblogtypes';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight  from 'rehype-highlight';
import  rehypeSlug  from 'rehype-slug';
import  rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import { SelectionType } from '@/types/createblogtypes';
import React,{ RefObject} from 'react';


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
    console.log({beforeSelection , afterSelection , selectedText});
    console.log(beforeSelection.length)

    return {selectedText ,beforeSelection , afterSelection};
  }


  /* checking if a ref exists */
  export const exsitsRef = (ref?:RefObject<HTMLElement>) =>{
    return ref && ref.current;
  }


  // check if text is not empty
  export const isSelectedTextEmpty = (text:string) => text.length === 0;

  // select the given a part of a text with the given from and to index
  export const executeChanges = (textAreaRef: textRef, from:number,to:number) =>{

    textAreaRef.current!.setSelectionRange(from , to);
    textAreaRef.current!.focus();
  }
  

  export const getSepretedText = (textAreaRef:textRef) =>{
    const {value , selectionStart , selectionEnd } = textAreaRef.current!;
    const {selectedText , beforeSelection , afterSelection} =  beforeAfterSelection({value , selectionStart , selectionEnd });
    return {selectedText:selectedText , beforeSelection:beforeSelection , afterSelection:afterSelection};
  }

  export const applyRechanges = (texteditorRef:textRef, prevVal:CommandType) =>{    
    texteditorRef.current!.value = prevVal.value;
    texteditorRef.current!.setSelectionRange(prevVal.selectedRange[0] , prevVal.selectedRange[1]);
    texteditorRef.current!.focus();
    return prevVal.value;
  }

