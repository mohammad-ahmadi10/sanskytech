import React, { FormEvent, useState , useCallback } from 'react'
import Tabs from '../../src/components/tabs/tabs';

import { MDXPost} from 'types/createblogtypes';
import "highlight.js/styles/atom-one-dark.css";
import { createMDXPost } from '@/src/utils/utilities';
import styles from "@/styles/createNewBlog.module.scss";
import Layout from 'pages/Layout';


    
    const  CreateNewBlog = () => {
        const [isEditorMode , setIsEditorMode] = useState(true);
        const [EditorValue , setEditorValue] = useState("");
        const [previewValue , setPreviewValue] = useState<MDXPost>();



        const getPost = useCallback( async () => {
            return createMDXPost(EditorValue);
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

    /* "
    new Array(3).fill(null).map((_, i) => {
                const id = String(i + 1);
                
                return {
                    label: `Card Tab ${id}`,
                    key: id,
                    children: `Content of card tab ${id}`,
                };
                })
    " */

   

    return (
        <Layout>

        <section className={styles.newBlogSectionWrapper}>
         
                <Tabs/>
                
        </section>
        </Layout>
        
    )
}

export default CreateNewBlog;