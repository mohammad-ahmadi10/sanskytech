import styles from "@/styles/tabs.module.scss";
import { useState, FormEvent, useCallback } from 'react';

import Editor from './../MarkdownEditor';
import MarkdownPreviewer from './../MarkdownPreviewer';
import { MDXPost } from 'types/createblogtypes';
import { createMDXPost } from '@/src/utils/utilities';

const Tabs =  () =>{
    const [toggleState , setToggleState] = useState(1); 

    const [EditorValue , setEditorValue] = useState("this is a inital value ");
    const [previewValue , setPreviewValue] = useState<MDXPost>();



    const getPost = useCallback( async () => {
        return createMDXPost(EditorValue);
    }, [EditorValue])
    const onPreview = async (e:FormEvent<HTMLDivElement>) =>{
        e.preventDefault()

        const {source , metadata} = await getPost();
        setPreviewValue({source ,metadata});
        /* setIsEditorMode(preState => !preState); */
    }
    

    const onEdit = useCallback((value:string) =>{
        setEditorValue(value);
    },[])


    const onTabClick = (index:number) =>{
        setToggleState(index);
    }
    
    const amIClicked = (index:number) =>  index === toggleState;
    
    return (
        <section className={styles.block_tabs}>

            <div className={styles.tabcontainer}>
                <div onClick={() => onTabClick(1)} 
                     className={`${amIClicked(1) ? styles.active_tab  : styles.tab}`}
                >Editor
                </div>
                <div onClick={(e) =>{ onTabClick(2); onPreview(e)}} 
                     className={`${amIClicked(2) ? styles.active_tab : styles.tab}`}
                >Preview
                </div>
                
                {/* <div className={`${amIClicked(2) ? styles.active_icon : styles.showoff}`}>
                </div> */}

            </div>

            <div className={styles.block_tabcontent}>
                <div className={`${amIClicked(1) ? styles.active_content  : styles.tapcontent}`}>
                        <Editor onEdit={onEdit} value={EditorValue} />
                </div>
                <div className={`${amIClicked(2) ? styles.active_content  : styles.tapcontent}`}>
                    <MarkdownPreviewer value={previewValue}/>
                </div>
            </div>
        </section>

    )
}


export default Tabs;