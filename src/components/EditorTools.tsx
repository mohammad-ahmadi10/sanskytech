
import { ImBold, ImUndo2 } from 'react-icons/im';
import { ImItalic } from 'react-icons/im';
import { ImRedo2 } from 'react-icons/im';


import { IconType } from 'react-icons/lib/esm/iconBase';
import styles from "@/styles/EditorTools.module.scss";
import { forwardRef, RefObject } from 'react';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';
import EditorIcon from './EditorIcon';



interface EditorToolsType {
  textAreaRef: RefObject<HTMLTextAreaElement> ,
  commandExecutor: (command:Command) => void
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

  const  EditorTools = forwardRef<HTMLTextAreaElement , EditorToolsType>((
    {textAreaRef , commandExecutor  , undo , redo , redoHistory , undoHistory }
    , ref) => {
    


    const onBold = () =>{
      commandExecutor(new BoldCommand(textAreaRef));
    }

    const onItalic = () =>{
      commandExecutor(new ItalicCommand(textAreaRef));
    }


    
  return (
    <div className='bg-none text-white flex flex-row'>
        
        <EditorIcon Icon={ImBold}   onIcon={onBold} />
          <EditorIcon Icon={ImItalic}   onIcon={onItalic} />
         <EditorIcon Icon={ImUndo2}   onIcon={undo} 
                     shouldDisable={undoHistory.length === 0} 
          />
          <EditorIcon Icon={ImRedo2}   onIcon={redo} shouldDisable={redoHistory.length === 0} />

    </div>
  )
})



EditorTools.displayName = 'EditorTools';
export default EditorTools