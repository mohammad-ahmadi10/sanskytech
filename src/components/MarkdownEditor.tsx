import React, { FormEvent, RefObject, useRef, useState } from 'react'
import { EditorType, textRef } from 'types/createblogtypes';
import { beforeAfterSelection , exsitsRef, excuteChanges } from '@/src/utils/utilities';
import {IconType}  from 'react-icons';
import styles from "@/styles/MarkEditor.module.scss";
import { ImBold, ImItalic } from 'react-icons/im';
import  {IconContext}  from 'react-icons';
import EditorTools from './EditorTools';
import { makeBold } from './EditorTool/Bolder';






const getSepretedText = (textAreaRef:textRef) =>{
  const {value , selectionStart , selectionEnd } = textAreaRef.current!;
  const {selectedText , beforeSelection , afterSelection} =  beforeAfterSelection({value , selectionStart , selectionEnd });
  return {selectedText:selectedText , beforeSelection:beforeSelection , afterSelection:afterSelection};
}



type CommandType ={
  value: string,
  selectedRange: [number , number]
}


interface Command{
  execute: (texteditorRef:textRef) => string,
  undo: (texteditorRef:textRef) => string,
  redo: (texteditorRef:textRef) => string
}

class BoldCommand implements Command {
  commandValue: CommandType;  
  constructor(value:string){
    this.commandValue = {value , selectedRange:[0 , 0]};
  }

  
  execute (editorRef: textRef)  {
    if(exsitsRef(editorRef)){
      const {selectedText , beforeSelection , afterSelection} = getSepretedText(editorRef);
      this.commandValue.selectedRange = [editorRef.current!.selectionStart , editorRef.current!.selectionEnd];
      const {newValue , from , to} = makeBold(editorRef , selectedText , beforeSelection , afterSelection);
      
      editorRef.current!.value = newValue;
      editorRef.current!.setSelectionRange(from , to);
      editorRef.current!.focus();
      
      
      return newValue;
    }
    return "";
  }


  undo(editorRef: textRef) {    
    const textarea = editorRef.current!;
    const prevVal = this.commandValue;
    this.commandValue = {value:textarea.value, 
                         selectedRange:[textarea.selectionStart, textarea.selectionEnd]};
    
    editorRef.current!.value = prevVal.value;
    editorRef.current!.setSelectionRange(prevVal.selectedRange[0] , prevVal.selectedRange[1]);
    editorRef.current!.focus();

    return prevVal.value;
  }

  redo(editorRef: textRef) {
    const textarea = editorRef.current!;
    const prevVal = this.commandValue;
    this.commandValue = {value:textarea.value, 
                         selectedRange:[textarea.selectionStart, textarea.selectionEnd]};
    editorRef.current!.value = prevVal.value;
    editorRef.current!.setSelectionRange(prevVal.selectedRange[0] , prevVal.selectedRange[1]);
    editorRef.current!.focus();
    return prevVal.value;
  }
  
}

const Editor = ({onEdit , value}:EditorType) => {

  const textAreaRef = useRef<HTMLTextAreaElement|null>(null);
  const [undoHistory , setUndoHistory] = useState<Command[]>([]);
  const [redoHistory , setRedoHistory] = useState<Command[]>([]);
  
  const excecuteCommand = (command:Command) =>{
    const newVal = command.execute(textAreaRef);
    setUndoHistory(prevVal => [...prevVal , command])
    onEdit(newVal);
  }

  const undo = () => {
    const command = undoHistory.pop();
    if(!command) return;
    const newVal = command!.undo(textAreaRef);
    setRedoHistory(prevVal => [...prevVal , command]);
    onEdit(newVal);
    
  }

  const redo = () =>{
    const command = redoHistory.pop();
    if(!command) return;
    const value = command!.redo(textAreaRef);
    setUndoHistory(prevVal => [...prevVal , command])
    onEdit(value);
  }

  
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





  const onBold = (e:FormEvent<HTMLInputElement>) =>{
    e.preventDefault()
    excecuteCommand(new BoldCommand(textAreaRef.current!.value));
  }

  const onUndo = (e:FormEvent<HTMLInputElement>) =>{
    e.preventDefault()
    undo();
  }
  
  const onRedo = (e:FormEvent<HTMLInputElement>) =>{
    e.preventDefault()
    redo();
  }
  return (
    <IconContext.Provider value={{size:"25"}}>
    <div className='w-full'>
      <div>
        <input onClick={onBold} 
               type="button" 
               value={"BOLD"} 
               className={"text-white pr-4"}
        />
        <input onClick={onUndo} 
               type="button" 
               value={"undo"} 
               className={"text-white pr-4"}
        />
        <input onClick={onRedo} 
               type="button" 
               value={"redo"} 
               className={"text-white"}
        />
      </div>

      <div className='border-solid border-2 border-cyan-500  
                      shadow-md shadow-cyan-500 rounded-b-md mt-1  box-border '>

          <EditorTools textAreaRef={textAreaRef} onEdit={onEdit}/> 

        <textarea
                className="
                w-full h-50 text-white resize-none outline-none rounded-b-md p-2
                font-mono 
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


Editor.displayName = 'Editor';
export default Editor