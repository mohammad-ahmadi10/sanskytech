import React, { FormEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { CommandType, EditorType, textRef } from 'types/createblogtypes';
import  {IconContext}  from 'react-icons';
import EditorTools from './EditorTools';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { UndoCommand } from '../pattern/command-pattern/undo-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';
import { beforeAfterSelection, exsitsRef } from '@/src/utils/utilities';


const Editor = ({onEdit , value}:EditorType) => {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [initalValue , setInitalValue] = useState<CommandType>({value:"", selectedRange:[0,0]});



  
  const [undoHistory , setUndoHistory] = useState<Command[]>([]);
  const [redoHistory , setRedoHistory] = useState<Command[]>([]);
  
  useEffect(()=>{
    if(exsitsRef(textAreaRef))
      setInitalValue({value:textAreaRef.current!.value, selectedRange:[0,0]});
  }, [])

  // undo redo handling
  const excecuteCommand = (command:Command) =>{
    const newVal = command.execute();

    setUndoHistory(prevVal => [...prevVal , command]);
    onEdit(newVal);

  };

  const undo = () => {
    let command =  undoHistory.pop();   
    if(command){
      setRedoHistory(prevVal => [...prevVal , command!]);
      let newVal = command!.undo();
      if(undoHistory.length === 0)  // if undo history is empty then set the inital value
        setInitalValue({value:newVal, selectedRange:[textAreaRef.current!.selectionStart , textAreaRef.current!.selectionEnd]});
      // onEdit(newVal);
      onEdit(newVal);
    }
  };


  const redo = () =>{
    const command = redoHistory.pop()
    if(!command) return;
    const value = command!.redo();
    setUndoHistory(prevVal => [...prevVal , command])
    // onEdit(value);
    onEdit(value);
  };
  
  
  const onTextareaChange = (e:FormEvent<HTMLTextAreaElement>) =>{
    const {value} = e.currentTarget as HTMLTextAreaElement;
    console.log(value[value.length-1] === " ")
    if(value[value.length-1] === " " || value[value.length-1] === "\n"){   
      excecuteCommand(new UndoCommand(textAreaRef, initalValue));
      setInitalValue({value:textAreaRef.current!.value, selectedRange:[textAreaRef.current!.selectionStart , textAreaRef.current!.selectionEnd]});
    }
    // onEdit(value)
    onEdit(value);
  } 


  
  const onEditorKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>{

    if(e === undefined) return;
    if(e.key === "Tab" ){
      e.preventDefault()
      const newValue = handleTab();
      excecuteCommand(new UndoCommand(textAreaRef, initalValue));
      setInitalValue({value:textAreaRef.current!.value, selectedRange:[textAreaRef.current!.selectionStart , textAreaRef.current!.selectionEnd]});
      onEdit( newValue);
    }
    
    if(e.ctrlKey &&  e.key === "z"){
      e.preventDefault()
      undo();
    }
    if(e.altKey &&  e.key === "z"){
      e.preventDefault()
      redo();
    }


    if(e.ctrlKey && e.key === "b"){
      e.preventDefault()
      excecuteCommand(new BoldCommand(textAreaRef))
    }
    if(e.ctrlKey && e.key === "i"){
      e.preventDefault()
      excecuteCommand(new ItalicCommand(textAreaRef))
    }
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
    };
  

  const handleTab = () =>{
    const {textarea  , selectionStart ,
      beforeSelection , afterSelection , 
      }  = getTextareaValues(); 
      
                                    
   const newValue = beforeSelection + "    " + afterSelection;
   textarea!.value = newValue;
   //textarea!.selectionStart = selectionEnd!;
   textarea!.selectionEnd = selectionStart! + 4;
   return newValue; 
  };


  

  /* const onBold = useCallback(() =>{
    excecuteCommand(new BoldCommand(textAreaRef));
  },[]);

  const onItalic = useCallback(() =>{
    excecuteCommand(new ItalicCommand(textAreaRef));
  },[]); */




  return (
    <div className='w-full'>

      <IconContext.Provider value={{size:"25"}}>
      <EditorTools 
          textAreaRef={textAreaRef} 
          commandExecutor={excecuteCommand}
          undo={undo}
          redo={redo}
          redoHistory={redoHistory}
          undoHistory={undoHistory}
          /> 
          </IconContext.Provider>







      <div className='border-solid border-2 border-cyan-500  
                      shadow-md shadow-cyan-500 rounded-b-md mt-1  box-border '>


        <textarea
                className="
                w-full h-50 text-white resize-none outline-none rounded-b-md p-4
                font-mono 
                "
                wrap='off'
                onKeyDown={onEditorKeydown} 
                value={value} 
                onChange={onTextareaChange} 
                ref={textAreaRef} 
                name="markeditor" 
                id="editor" 
                
                cols={100} rows={30}

                onFocus={()=>{setInitalValue(val => ({...val , selectedRange:[textAreaRef.current!.selectionStart, textAreaRef.current!.selectionEnd]} ))
              }}
                >  
        </textarea>

        </div>
    </div>
  )
}


Editor.displayName = 'Editor';

export default Editor;