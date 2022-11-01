import React, { FormEvent, RefObject, useRef } from 'react'
import { EditorType } from 'types/createblogtypes';
import { beforeAfterSelection , exsitsRef } from '@/src/utils/utilities';
import { IconType } from 'react-icons';
import styles from "@/styles/MarkEditor.module.scss";
import { ImBold, ImItalic } from 'react-icons/im';
import { IconContext } from 'react-icons';
import EditorTools from './EditorTools';




const Editor = ({onEdit , value}:EditorType) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  
  
  const onTextareaChange = (e:FormEvent<HTMLTextAreaElement>) =>{
    const {value} = e.currentTarget as HTMLTextAreaElement;
    onEdit(value)
  }

  const getTextareaValues = () =>{
    if(exsitsRef(textAreaRef)){
      const textarea= textAreaRef.current!;
      const {value , selectionStart , selectionEnd } = textarea;
      const {selectedText ,  beforeSelection , afterSelection} =  beforeAfterSelection({value , selectionStart , selectionEnd });      
      return {textarea , value , selectionStart , 
              selectionEnd , beforeSelection , afterSelection , 
              selectedText } 
    }
    return {}

  }

  const applyChangesToTextarea = (textarea:HTMLTextAreaElement , newValue:string)=>{
    textarea.value = newValue;      
    onEdit(newValue)
  }

  // handling the tab button
  const onKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) =>{
    if(e.key === "Tab"){
      e.preventDefault()
      const {textarea  , selectionStart , 
         beforeSelection , afterSelection , 
         }  = getTextareaValues();

      const newValue = beforeSelection + "\t" + afterSelection ;
      textarea!.selectionEnd = selectionStart! + 1;
      applyChangesToTextarea(textarea! ,  newValue)
    }
  }





  return (
    <IconContext.Provider value={{size:"25"}}>
    <div className='w-full'>
      <div>
        {/* <input onClick={onBoldClick} 
               type="button" 
               value={"BOLD"} 
        /> */}
      </div>

      <div className='border-solid border-2 border-cyan-500  shadow-md shadow-cyan-500 rounded-b-md mt-1  '>

          <EditorTools textAreaRef={textAreaRef} onEdit={onEdit}/> 

        <textarea
                className="
                w-full h-4/5 text-white resize-none outline-none rounded-b-md p-2
                text-xl font-mono
                "
                onKeyDown={onKeyDown} 
                value={value} 
                onChange={onTextareaChange} 
                ref={textAreaRef} 
                name="markeditor" 
                id="editor" 
                cols={100} rows={30}
                
                >
        </textarea>
        </div>
    </div>
  </IconContext.Provider>
  )
}

export default Editor