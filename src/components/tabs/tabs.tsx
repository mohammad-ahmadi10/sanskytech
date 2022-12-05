import styles from "@/styles/tabs.module.scss";
import { useState, FormEvent, useCallback } from 'react';

import Editor from './../MarkdownEditor';
import MarkdownPreviewer from './../MarkdownPreviewer';
import { MDXPost } from 'types/createblogtypes';
import { createMDXPost } from '@/src/utils/utilities';

const initailValue = `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules
___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....
`; 



const Tabs =  () =>{
    const [toggleState , setToggleState] = useState(1); 

    const [EditorValue , setEditorValue] = useState(initailValue);
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


    const onSaveClick = async () =>{
        console.log("save");
    }
    const onTabClick = (index:number) =>{
        setToggleState(index);
    }
    
    const amIClicked = (index:number) =>  index === toggleState;
    
    return (
        <section className={/* styles.block_tabs */ "w-full h-full md:w-11/12 lg:w-11/12 text-md md:text-xl max-w-screen-xl"}>

            <div className={`${styles.tabcontainer} sticky top-0`}>
                <div onClick={() => onTabClick(1)} 
                     className={`${amIClicked(1) ? styles.active_tab  : styles.tab}`}
                >Editor
                </div>
                <div onClick={(e) =>{ onTabClick(2); onPreview(e)}} 
                     className={`${amIClicked(2) ? styles.active_tab : styles.tab}`}
                >Preview
                </div>
                
                <div className={`ml-auto w-20 h-auto cursor-pointer rounded bg-sky-500 shadow-md shadow-cyan-500/40 text-center  flex items-center justify-center 
                                hover:bg-sky-500/90 hover:shadow-md hover:shadow-cyan-500/50 hover:text-white text-white/80
                                `}
                     onClick={(_) =>{ onSaveClick()}}                
                >
                    <span>
                    SAVE
                    </span>
                </div>

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