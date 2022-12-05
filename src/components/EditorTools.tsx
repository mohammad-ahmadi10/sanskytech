
import {FaUndo , FaRedo} from "react-icons/fa";
import { ImBold, ImItalic } from 'react-icons/im';
import {FaHashtag} from 'react-icons/fa';


import { IconType } from 'react-icons/lib/esm/iconBase';
import { forwardRef, RefObject, useState } from 'react';
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


  const  EditorTools = forwardRef<HTMLTextAreaElement , EditorToolsType>((
    {textAreaRef , commandExecutor  , undo , redo , redoHistory , undoHistory }
    , ref) => {
    

    const [isHeadingSelected , setIsHeadingSelected] = useState(false);

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




    const onHeading = (name:string) =>{

      setIsHeadingSelected(true);
        console.log(name);

        setTimeout(() => {setIsHeadingSelected(false);}, 250);
    }


  return (
    <div className='bg-slate-200 text-white flex flex-row items-center sticky top-[34px] sm:top-[49px]  h-10 mt-2 border border-slate-800 border-solid border-y-0'>
        
        <div /* onMouseLeave={_=> setIsHeadingSelected(false)} */ className={styles.dropdown}>
        <EditorIcon Icon={FaHashtag} onIcon={onHtag}/>
              <div className={`${isHeadingSelected ? styles.dropdownDisapear : styles.dropdownContent}`}>
                <Heading onHeading={onHeading}  ><h1>Heading 1</h1></Heading>
                <Heading  ><h2>Heading 2</h2></Heading>
                <Heading  ><h3>Heading 3</h3></Heading>
                <Heading  ><h4>Heading 4</h4></Heading>
                <Heading  ><h5>Heading 5</h5></Heading>
              </div>
        </div>
        <EditorIcon Icon={ImBold}   onIcon={onBold} />
        <EditorIcon Icon={ImItalic}   onIcon={onItalic} />
        <div className='m-auto mr-10 flex justify-center items-center '>

        <EditorIcon Icon={FaUndo}   onIcon={undo} 
                     shouldDisable={undoHistory.length === 0} 
                     />
        <EditorIcon Icon={FaRedo}   onIcon={redo} shouldDisable={redoHistory.length === 0} />
                     </div>

    </div>
  )
})



EditorTools.displayName = 'EditorTools';
export default EditorTools