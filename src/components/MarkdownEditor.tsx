import React, { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import { EditorType, textRef } from 'types/createblogtypes';
import { beforeAfterSelection , exsitsRef, executeChanges, getSepretedText } from '@/src/utils/utilities';
import {IconType}  from 'react-icons';
import styles from "@/styles/MarkEditor.module.scss";
import { ImBold, ImItalic } from 'react-icons/im';
import  {IconContext}  from 'react-icons';
import EditorTools from './EditorTools';
import { makeBold } from './EditorTool/Bolder';
import { useCallback } from 'react';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { UndoCommand } from '../pattern/command-pattern/undo-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';




const Editor = ({onEdit , value}:EditorType) => {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [initalValue , setInitalValue] = useState("");

  const [textareaKeyEvent , setTextareaKeyEvent] = useState<React.KeyboardEvent<HTMLTextAreaElement>>();


  
  const [undoHistory , setUndoHistory] = useState<Command[]>([]);
  const [redoHistory , setRedoHistory] = useState<Command[]>([]);
  
  useEffect(()=>{
    if(exsitsRef(textAreaRef))
      setInitalValue(textAreaRef.current!.value);
  }, [])


  // undo redo handling
  const excecuteCommand = (command:Command) =>{
    const newVal = command.execute();

    setUndoHistory(prevVal => [...prevVal , command]);
    onEdit(newVal);
  }
  
  const undo = () => {
    // let command = undoHistory.length !== 1 ? undoHistory.pop() : undefined;   
    let command =  undoHistory.pop();   
        
    if(undoHistory.length === 0){
      if(textAreaRef.current!.value !== initalValue)
        onEdit(initalValue);
    }

    

    if(command){
      setRedoHistory(prevVal => [...prevVal , command!]);
      let newVal = command!.undo();
      onEdit(newVal);
    }

  }


  const redo = () =>{
    const command = redoHistory.pop()
    if(!command) return;
    const value = command!.redo();
    setUndoHistory(prevVal => [...prevVal , command])
    onEdit(value);
  }


    /* useEffect(() => 
    {

      excecuteCommand(
        new UndoCommand( textAreaRef, 
        {value:textAreaRef.current!.value, 
        selectedRange:[0 , textAreaRef.current!.value.length ]}
        ))
    }, [])   */  
  


  
  const onTextareaChange = (e:FormEvent<HTMLTextAreaElement>) =>{
    const {value} = e.currentTarget as HTMLTextAreaElement;




    if(value[value.length-1] === " " || value[value.length-1] === "\n"){      
      excecuteCommand(new UndoCommand(textAreaRef, 
        {value:textAreaRef.current!.value, 
          selectedRange:[textAreaRef.current!.selectionStart , textAreaRef.current!.selectionEnd]}
      ));
    }
    onEdit(value)
  }


  



  

  return (
    <IconContext.Provider value={{size:"25"}}>
    <div className='w-full'>

      <EditorTools 
          textAreaRef={textAreaRef} 
          onEdit={onEdit}
          commandExecutor={excecuteCommand}
          textareaKeyEvent={textareaKeyEvent}
          undo={undo}
          redo={redo}
          redoHistory={redoHistory}
          undoHistory={undoHistory}
      /> 

      <div className='border-solid border-2 border-cyan-500  
                      shadow-md shadow-cyan-500 rounded-b-md mt-1  box-border '>


        <textarea
                className="
                w-full h-50 text-white resize-none outline-none rounded-b-md p-2
                font-mono 
                "
                onKeyDown={setTextareaKeyEvent} 
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

export default Editor;