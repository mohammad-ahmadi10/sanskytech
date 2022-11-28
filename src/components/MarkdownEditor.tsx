import React, { FormEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CommandType, EditorType, textRef } from 'types/createblogtypes';
import  {IconContext}  from 'react-icons';
import EditorTools from './EditorTools';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { UndoCommand } from '../pattern/command-pattern/undo-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';
import { beforeAfterSelection, exsitsRef } from '@/src/utils/utilities';
import styles from "@/styles/MarkEditor.module.scss";


const Editor = ({onEdit , value}:EditorType) => {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const linesContainer = useRef<HTMLDivElement>(null);


  const [initalValue , setInitalValue] = useState<CommandType>({value:"", selectedRange:[0,0]});
  const [numberOfLines, setNumberOfLines] = useState<number>(1);
  const [activeLine, setActiveLine] = useState<number>(1);

 

  
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
      const lines = newVal.split("\n").length;
      if(numberOfLines !== lines){
        addLineNumbers(lines);
        setNumberOfLines(lines);
      }
      onEdit(newVal);
    }
  };


  const redo = () =>{
    const command = redoHistory.pop()
    if(!command) return;
    const value = command!.redo();
    
    setUndoHistory(prevVal => [...prevVal , command])

    const lines = value.split("\n").length;
    if(numberOfLines !== lines){
      addLineNumbers(lines);
      setNumberOfLines(lines);
    }

    onEdit(value);
  };
  
  
  const onTextareaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{;
    // create span for each line
    const lines = e.currentTarget.value.split("\n").length

    if(numberOfLines !== lines){
      
      calculateActiveLine();
      setNumberOfLines(lines);
    }

    const {value} = e.currentTarget as HTMLTextAreaElement;
    if(value[value.length-1] === " " || value[value.length-1] === "\n"){   
      excecuteCommand(new UndoCommand(textAreaRef, initalValue));
      setInitalValue({value:textAreaRef.current!.value, selectedRange:[textAreaRef.current!.selectionStart , textAreaRef.current!.selectionEnd]});
    }
    // onEdit(value)
    onEdit(value);
  } 




  const addLineNumbers = (numberOflines:number , activeLine?:number) =>{
    linesContainer.current!.innerHTML = ""
    for(let i = 1; i <= numberOflines; i++){
      const span = document.createElement("span");
      span.className = 'before:text-gray-400';
      if(i === activeLine){
        span.className = 'before:text-black';
      }
      linesContainer.current!.appendChild(span);
    }
  }



  const calculateActiveLine = () =>{
    const line = textAreaRef.current!.value.substring(0, textAreaRef.current!.selectionStart).split("\n").length;
    setActiveLine(line);
    addLineNumbers(textAreaRef.current!.value.split('\n').length,line);
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
    
    if(e.key === "ArrowUp" || e.key === "narowup" || e.key === "ArrowDown" || e.key === 'narowdown'){
      setActiveLine(activeLine);
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







      <div className=' 
                      box-border flex   leading-10
                      shadow-lg 
                       '>


        <div ref={linesContainer}  className={`${styles.lineNumber} 
        bg-white border-r-gray-200 border-r shadow-inner 
        w-20
        `}>
          <span className='before:text-gray-400 '></span>
        </div>
        <textarea
                className="
                w-full h-50  resize-none outline-none rounded-b-md pl-2
                font-mono leading-10 
                focus:border-solid
                focus:border-2 
                focus:border-cyan-500 
                focus:shadow-md 
                focus:shadow-cyan-500 
                focus:rounded-b-md 
                "
                wrap='off'
                onKeyDown={onEditorKeydown} 
                onMouseUp={_ => calculateActiveLine() }
                onKeyUp={_ => calculateActiveLine() }
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