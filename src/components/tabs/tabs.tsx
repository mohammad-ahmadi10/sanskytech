import styles from "@/styles/tabs.module.scss";
import { useState, FormEvent, useCallback } from 'react';

import Editor from './../MarkdownEditor';
import MarkdownPreviewer from './../MarkdownPreviewer';
import { MDXPost } from 'types/createblogtypes';
import { createMDXPost } from '@/src/utils/utilities';
import {MdPublish} from 'react-icons/md';
import { useEffect } from 'react';

const initailValue = `
<Image alt="image" src={"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"}
width={260}
height={56} layout='responsive' />
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

<Image alt="image" src={"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"}
width={260}
height={56} layout='responsive' />
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

    const [editorScrollPosition , setEditorScrollPosition] = useState(0);
    const [previewScrollPosition , setPreviewScrollPosition] = useState(0);



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
        console.log(index);

        if(index === 1){
            setPreviewScrollPosition(window.scrollY);
            window.scrollTo(0,editorScrollPosition);
        }
        if(index === 2){
            setEditorScrollPosition(window.scrollY);
            window.scrollTo(0,previewScrollPosition);
        }
        setToggleState(index);
    }

    const amIClicked = (index:number) =>  index === toggleState;
    
    return (
        <section className={`w-full h-full lg:w-11/12 text-md md:text-xl lg:max-w-screen-xl
                            `}>
            <div className={`${styles.tabcontainer} sticky top-0 z-[1000] bg-white h-[2.7em]                                dark:bg-secondaryDarkBg`}>
                <div className="w-3"></div>
                <div onClick={() => onTabClick(1)} /* shadow-sm shadow-neutral-100 dark:shadow-neutral-600 */
                     className={
                        `
                       text-black dark:text-white/50 text-center cursor-pointer p-2 flex-[0.2] 
                       flex justify-center items-center border-r
                       ${amIClicked(1) ?
                        'bg-[#E5E7EB] dark:bg-[#6B7280]  border-l border-slate-800 shadow-sm shadow-neutral-100 dark:shadow-neutral-600 hover:bg-[#e6e6e6]/60 dark:hover:text-white  relative before:absolute before:-top-[5px] before:left-1/2 before:-translate-x-1/2 before:w-full before:h-1 before:shadow-md before:shadow-slate-400  dark:before:shadow-slate-800 block before:bg-cyan-500  before:content-""'
                        
                        : 'bg-[#ffffff] dark:bg-[#4D4D4D] text-gray-500/90 hover:text-black dark:hover:text-white '}
                       
                       `
                     }
                ><span className="text-xs sm:text-lg">Editor</span>
                </div>
                <div onClick={(e) =>{ onTabClick(2); onPreview(e)}} 
                     className={`
                       text-black dark:text-white/50 text-center cursor-pointer p-2 flex-[0.2]
                       flex justify-center items-center
                       ${amIClicked(2) ?
                        'bg-[#E5E7EB] dark:bg-[#000000] border-r border-l border-slate-800 dark:border-slate-200 shadow-sm shadow-neutral-100 dark:shadow-neutral-900 hover:bg-[#e6e6e6]/60 dark:hover:text-white  relative before:absolute before:-top-[5px] before:left-1/2 before:-translate-x-1/2 before:w-full before:h-1 before:shadow-md before:shadow-slate-400  dark:before:shadow-slate-800 block before:bg-cyan-500  before:content-""'
                        
                        : 'bg-[#ffffff] dark:bg-[#4D4D4D] text-gray-500/90 hover:text-black dark:hover:text-white '}
                       
                       `}
                ><span className="text-xs sm:text-lg">Preview</span>
                </div>
                
                <div className={`ml-auto w-20 md:w-40 h-auto cursor-pointer rounded bg-sky-500 shadow-md shadow-cyan-500/40 text-center  flex items-center justify-center 
                                hover:bg-sky-500/90 hover:shadow-md hover:shadow-cyan-500/50 hover:text-white text-white/80
                                dark: rounded-none 
                                `}
                     onClick={(_) =>{ onSaveClick()}}                
                >
                    
                    <MdPublish/>
                    <span className="text-xs sm:text-lg">
                     Publish
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