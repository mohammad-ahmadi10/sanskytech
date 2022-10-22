import Editor from '@/src/components/MarkdownEditor';
import MarkdownPreviewer from '@/src/components/MarkdownPreviewer';
import React, { FormEvent, useState , useCallback } from 'react'
import { MDXPost} from 'types/createblogtypes';

import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import  rehypeAutoLinkHeadings from "rehype-autolink-headings";
import matter from "gray-matter";
import { Post } from './../types/createblogtypes';

import rehypeHighlight from "rehype-highlight"


import "highlight.js/styles/atom-one-dark.css";

import {useEffect} from "react";



  const getPostFromSlug = ( EditorValue:string): Post =>{
      const {content , data} = matter(EditorValue);
      
      
      
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
    
    const  CreateNewBlog = () => {
        const [isEditorMode , setIsEditorMode] = useState(true);
        const [EditorValue , setEditorValue] = useState("");
        const [previewValue , setPreviewValue] = useState<MDXPost>();



        const getPost = useCallback( async () => {
        const {content , metadata}  = getPostFromSlug(EditorValue);
        const mdxSource = await serialize(content , {
          mdxOptions:{
              rehypePlugins: [
                  rehypeHighlight/* ,
                  rehypeSlug , 
                  [rehypeAutoLinkHeadings , {behaviour: "wrap"} ], */

              ]
          }
      });
      console.log(mdxSource)

      return {source:mdxSource , metadata};
      }, [EditorValue])


    const onPreview = async (e:FormEvent<HTMLInputElement>) =>{
        e.preventDefault()


        const {source , metadata} = await getPost();
        setPreviewValue({source ,metadata});
        setIsEditorMode(preState => !preState);
    }

    const onEdit = (value:string) =>{
        setEditorValue(value);
    }

    return (
        <section>
            <div>
                <input type={"button"} 
                       onClick={onPreview} 
                       value={isEditorMode ? "Preview" : "Editor"}  
                />
            </div>
            
            {isEditorMode ? 
                    <Editor onEdit={onEdit} value={EditorValue} />
                : 
                    <MarkdownPreviewer value={previewValue}/>
            }
        </section>
    )
}

export default CreateNewBlog;