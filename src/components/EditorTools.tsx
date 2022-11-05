
import { ImBold } from 'react-icons/im';
import { ImItalic } from 'react-icons/im';
import { ImRedo2 } from 'react-icons/im';
import { ImUndo2 } from 'react-icons/im';


import { IconType } from 'react-icons/lib/esm/iconBase';
import styles from "@/styles/EditorTools.module.scss";
import { forwardRef, RefObject, FormEvent, useEffect, KeyboardEvent } from 'react';
import { exsitsRef  , beforeAfterSelection, executeChanges } from '@/src/utils/utilities';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { textRef } from '@/types/createblogtypes';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';



interface EditorToolsType {
  textAreaRef: RefObject<HTMLTextAreaElement> ,
  onEdit: (value:string) => void,
  commandExecutor: (command:Command) => void
  textareaKeyEvent: KeyboardEvent<HTMLTextAreaElement> | undefined
  undo: () => void
  redo: () => void
  redoHistory: Command[]
  undoHistory: Command[]
}


const getIcon = (Icon:IconType , onIcon:()=>void , shouldDisable?:boolean) =>{

  return <div className={`${(shouldDisable===true) ? styles.disableIcon  : styles.icon }`} onClick={_ => onIcon()}>
            <Icon/>
    </div>
  }
  

  
  const getTextareaValues = (textAreaRef:textRef) =>{
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


  const handleTab = (texareaRef:textRef) =>{
    const {textarea  , selectionStart ,
      beforeSelection , afterSelection , 
      }  = getTextareaValues(texareaRef); 
   const newValue = beforeSelection + "\t" + afterSelection;
   textarea!.value = newValue;
   //textarea!.selectionStart = selectionEnd!;
   textarea!.selectionEnd = selectionStart! + 1;
   return newValue; 
  }


  


  
  
  
  
  
  
  const  EditorTools = forwardRef<HTMLTextAreaElement , EditorToolsType>((
    {textAreaRef , onEdit, commandExecutor , textareaKeyEvent , undo , redo , redoHistory , undoHistory }
    , ref) => {
    

    const onEditorKeydown = () =>{
      const e = textareaKeyEvent!;
      if(e === undefined) return;
      
      if(e.key === "Tab" ){
        e.preventDefault()
        const newValue = handleTab(textAreaRef);
        onEdit(newValue);
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
        commandExecutor(new BoldCommand(textAreaRef))
      }
      if(e.ctrlKey && e.key === "i"){
        e.preventDefault()
        commandExecutor(new ItalicCommand(textAreaRef))
      }
    }


    useEffect(() => {
      onEditorKeydown();
    }, [textareaKeyEvent])


    const onBold = () =>{
      commandExecutor(new BoldCommand(textAreaRef));
    }

    const onItalic = () =>{
      commandExecutor(new ItalicCommand(textAreaRef));
    }


    
  return (
    <div className='bg-none text-white flex flex-row'>
        
        {getIcon(ImBold , onBold )}
        {getIcon(ImItalic, onItalic)}
        {getIcon(ImUndo2, undo , undoHistory.length === 0)}
        {getIcon(ImRedo2, redo , redoHistory.length === 0)}


    </div>
  )
})



EditorTools.displayName = 'EditorTools';
export default EditorTools