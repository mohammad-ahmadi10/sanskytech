import React, { FormEvent, useRef } from 'react'
import { EditorType, SelectionType } from 'types/createblogtypes';



const Editor = ({onEdit , value}:EditorType) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const beforeAfterSelection = ({value , selectionStart , selectionEnd }:SelectionType) =>{
    const beforeSelection = value.substring(0 , selectionStart);
    const afterSelection = value.substring(selectionEnd);
    const selectedText = value.substring(selectionStart , selectionEnd);
    return {selectedText ,beforeSelection , afterSelection};
  }

  
  const textareaExists = () =>{
    return textAreaRef && textAreaRef.current;
  }
  const onBoldClick = (_:FormEvent<HTMLInputElement>) =>{
    if(textareaExists()){
      const textarea= textAreaRef.current!;
      const {value , selectionStart , selectionEnd } = textarea;
      const {selectedText , beforeSelection , afterSelection} =  beforeAfterSelection({value , selectionStart , selectionEnd });
      const newValue = beforeSelection + "**" + selectedText + "**" + afterSelection;
      textarea.value = newValue;      
      onEdit(newValue)
      textarea.focus();
    }

  }
  
  const onTextareaChange = (e:FormEvent<HTMLTextAreaElement>) =>{
    const {value} = e.currentTarget as HTMLTextAreaElement;
    onEdit(value)
  }
  return (
    <div>
      <input onClick={onBoldClick} type="button" value={"BOLD"} />
      <textarea value={value} onChange={onTextareaChange} ref={textAreaRef} name="markeditor" id="editor" cols={100} rows={30}
      >
      </textarea>
    </div>
  )
}

export default Editor