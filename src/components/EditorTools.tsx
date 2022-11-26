
import { ImBold, ImUndo2 } from 'react-icons/im';
import { ImItalic } from 'react-icons/im';
import { ImRedo2 } from 'react-icons/im';
import {FaHashtag} from 'react-icons/fa';


import { IconType } from 'react-icons/lib/esm/iconBase';
import { forwardRef, RefObject } from 'react';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';
import EditorIcon from './EditorIcon';

import styles from "@/styles/EditorTools.module.scss";
import Heading from './Heading';


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
    const onHtag = () =>{
      console.log("htag");

     // commandExecutor(new ItalicCommand(textAreaRef));
    }


    const onItalic = () =>{
      commandExecutor(new ItalicCommand(textAreaRef));
    }


    const onHtagHovered = (ishovered:boolean) =>{
      console.log(ishovered);
    }



    const onHeading = (name:string) =>{
        console.log(name);
    }


  return (
    <div className='bg-none text-white flex flex-row'>
        
        <div className={styles.dropdown}>
        <EditorIcon Icon={FaHashtag} onIcon={onHtag}/>
              <div className={styles.dropdownContent}>
                <Heading onHeading={onHeading}  ><h1>Heading 1</h1></Heading>
                <Heading  ><h2>Heading 2</h2></Heading>
                <Heading  ><h3>Heading 3</h3></Heading>
                <Heading  ><h4>Heading 4</h4></Heading>
                <Heading  ><h5>Heading 5</h5></Heading>
              </div>
        </div>
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