
import {FaUndo , FaRedo} from "react-icons/fa";
import { ImBold, ImItalic } from 'react-icons/im';
import {FaHashtag} from 'react-icons/fa';
import {BiImageAdd} from 'react-icons/bi';
import {BsYoutube} from 'react-icons/bs';



import { forwardRef, RefObject, useRef, useState } from 'react';
import { Command } from './../pattern/command-pattern/commands-pattern';
import { BoldCommand } from './../pattern/command-pattern/Bold-command';
import { ItalicCommand } from '../pattern/command-pattern/Italic-command';
import EditorIcon from './EditorIcon';

import styles from "@/styles/EditorTools.module.scss";
import Heading from './Heading';
import { HeadingCommand } from './../pattern/command-pattern/Heading-command';
import { ImageCommand } from './../pattern/command-pattern/Image-command';
import { ImageContentType } from '@/src/pattern/command-pattern/commands-pattern';
import { Notifi } from "../utils/noti";
import { toast } from 'react-toastify';
import { YoutubeCommand } from './../pattern/command-pattern/Youtube-command';



interface EditorToolsType {
  textAreaRef: RefObject<HTMLTextAreaElement> ,
  commandExecutor: (command:Command) => void
  undo: () => void
  redo: () => void
  redoHistory: Command[]
  undoHistory: Command[]
  onSelectChange: () => void

}


  const  EditorTools = forwardRef<HTMLTextAreaElement , EditorToolsType>((
    {textAreaRef , commandExecutor  , undo , redo , redoHistory , undoHistory, onSelectChange}
    , ref) => {
    

    const heightRef = useRef<HTMLInputElement>(null);
    const widthRef = useRef<HTMLInputElement>(null);
    const imgUrlRef = useRef<HTMLInputElement>(null);
    const youtubeUrlRef = useRef<HTMLInputElement>(null);

    const altRef = useRef<HTMLInputElement>(null);
    const imagePos = useRef<HTMLInputElement>(null);

    
    const [isImgBtnDisabled , setIsImgBtnDisabled] = useState(true);
    const [isYoutubeBtnDisabled , setIsYoutubeBtnDisabled] = useState(true);

    const [isHeadingSelected , setIsHeadingSelected] = useState(false);

    const shouldImgBtnDisabled = (v:string) => {
      const found = (imgUrlRef.current!.value).match(/(https?:\/\/.*\.(jpeg|jpg|gif|png))/i) != null;
      setIsImgBtnDisabled(v.length === 0 || !found);
    }

    const shouldYoutubeBtnDisabled = (v:string) => {
      const found = (youtubeUrlRef.current!.value).match( /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i) != null;
      setIsYoutubeBtnDisabled(v.length === 0 || !found);
    }


    const onBold = () =>{
      commandExecutor(new BoldCommand(textAreaRef));
    }
    const onHtag = () =>{
      textAreaRef.current!.focus();
        if(isHeadingSelected)
        setIsHeadingSelected(false);
    }


    
    const onItalic = () =>{
      commandExecutor(new ItalicCommand(textAreaRef));

    }

    const onYoutubeAdd = ()=>{
      commandExecutor(new YoutubeCommand(textAreaRef, youtubeUrlRef.current!.value ));
    }


    const onImageAdd = () =>{
      if(imgUrlRef.current!.value && altRef.current!.value && heightRef.current!.value && widthRef.current!.value){

         const radioLabels = imagePos.current!.children;
         let ImagePosition = 'right';

         for(let index=0;index< radioLabels.length;index++){
            const radioLabel = radioLabels[index];
            if((radioLabel.children[1] as HTMLInputElement).checked){
              ImagePosition = (radioLabel.children[0] as HTMLSpanElement).innerHTML;
              break;
            }
         }

        const imageContent:ImageContentType = {
          url: imgUrlRef.current!.value,
          alt: altRef.current!.value,
          height: +heightRef.current!.value,
          width: +widthRef.current!.value,
          position: ImagePosition
        };

      commandExecutor(new ImageCommand(textAreaRef, imageContent));
      }
      else{
        toast.warn("Please fill all the fields");
        
      }
    }



    const onHeading = (name:string) =>{

      setIsHeadingSelected(true);
      
      switch(name){
        case 'Heading 1':
          commandExecutor(new HeadingCommand(textAreaRef , 'Heading 1'));
          break;
        case 'Heading 2':
          commandExecutor(new HeadingCommand(textAreaRef , 'Heading 2'));
          break;
        case 'Heading 3':
          commandExecutor(new HeadingCommand(textAreaRef , 'Heading 3'));
          break;
        case 'Heading 4':
          commandExecutor(new HeadingCommand(textAreaRef , 'Heading 4'));
          break;
        case 'Heading 5':
          commandExecutor(new HeadingCommand(textAreaRef , 'Heading 5'));
          break;

      }
    }

   /* z-[1000] */

  return (
    <div className='bg-slate-200 dark:bg-[#2B2A33] text-white flex flex-row 
                    items-center sticky top-[34px] 
                    sm:top-[52px]  h-12 mt-2 
                    
                  

                    '
    >
                      
        <div /* onMouseLeave={_=> setIsHeadingSelected(false)} */ className={styles.dropdown}>
          <Notifi />
        <EditorIcon Icon={FaHashtag} onIcon={onHtag}/>
              <div className={`${isHeadingSelected ? styles.dropdownDisapear : styles.dropdownContent}`}>
                <Heading onHeading={onHeading}  ><h1>Heading 1</h1></Heading>
                <Heading onHeading={onHeading}   ><h2>Heading 2</h2></Heading>
                <Heading  onHeading={onHeading} ><h3>Heading 3</h3></Heading>
                <Heading  onHeading={onHeading}  ><h4>Heading 4</h4></Heading>
                <Heading onHeading={onHeading} ><h5>Heading 5</h5></Heading>
              </div>
        </div>
        <EditorIcon Icon={ImBold}   onIcon={onBold} />
        <EditorIcon Icon={ImItalic}   onIcon={onItalic} />
        <label htmlFor="image-popup" className="btn btn-ghost hover:unused ">
          <EditorIcon styles={"pointer-events-none"}  Icon={BiImageAdd} />
        </label>
        <label htmlFor="youtube-popup" className="btn btn-ghost hover:unused ">
          <EditorIcon styles={"pointer-events-none"}  Icon={BsYoutube} />
        </label>


        
        <div className='m-auto mr-5 sm:mr-10 flex justify-center items-center '>
        <EditorIcon Icon={FaUndo}   onIcon={undo} 
                     shouldDisable={undoHistory.length === 0} 
                     />
        <EditorIcon Icon={FaRedo}   onIcon={redo} shouldDisable={redoHistory.length === 0} />
                     </div>



    {/* Image Popup */}
{/* Put this part before </body> tag */}
<div className="relative z-1000000" >
<input onClick={_ => onSelectChange()} type="checkbox" id="image-popup" className="modal-toggle" />
<label htmlFor="image-popup" className="modal cursor-pointer">
  <label className="modal-box relative" htmlFor="">
    <label htmlFor="url" className="text-md label-text font-bold">put the url of the Image</label>
    <input onChange={e=> shouldImgBtnDisabled(e.currentTarget.value)} ref={imgUrlRef} id="url" type="text" defaultValue={"https://"} placeholder="https://" required className="input w-full max-w-lg h-min" />
    <label htmlFor="url" className="text-md label-text font-bold">Alt of Image</label>
    <input onChange={e=> shouldImgBtnDisabled(e.currentTarget.value)} ref={altRef} id="url" type="text" defaultValue={"image"} placeholder="image" className="input w-full max-w-lg h-min" />
    <div className="flex align-center justify-between">
      <div>
    <label htmlFor="width" className="label-text label text-md font-bold">Width</label>
    <input onChange={e=> shouldImgBtnDisabled(e.currentTarget.value)} ref={widthRef} id="width" type="text" defaultValue={250} placeholder="250" className="input input-xs w-20" />
      </div>
    <div className="mb-2">

    <label htmlFor="height" className="label-text label text-md font-bold">height</label>
    <input onChange={e=> shouldImgBtnDisabled(e.currentTarget.value)} ref={heightRef} id="height" type="text" defaultValue={250} placeholder="250" className="input input-xs w-20" />
    </div>
    <div></div>
    </div>

    {/* radio  */}

      <div ref={imagePos} className="form-control " style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
        <label className="label cursor-pointer w-20">
          <span className="label-text">Left</span> 
          <input onChange={console.log} type="radio" name="radio-10" className="radio checked:bg-blue-500"  checked />
        </label>
        <label className="label cursor-pointer w-20 ">
          <span className="label-text">Center</span> 
          <input onChange={console.log} type="radio" name="radio-10" className="radio checked:bg-red-500"  checked />
        </label>

        <label className="label cursor-pointer w-20">
          <span className="label-text">Right</span> 
          <input onChange={console.log} type="radio" name="radio-10" className="radio checked:bg-green-500" checked />
        </label>
      </div>


    <button
     disabled={isImgBtnDisabled}
     id="add-image"
     className="btn btn-active btn-accent" onClick={onImageAdd}>Add Image</button>
  </label>
</label>
  </div>
    {/* Ende Image Popup */}

    {/* Youtube Popup */}
    <input onClick={_ => onSelectChange()} type="checkbox" id="youtube-popup" className="modal-toggle" />
<label htmlFor="youtube-popup" className="modal cursor-pointer">
  <label className="modal-box relative" htmlFor="">
    <label htmlFor="url" className="text-md label-text text-white font-bold">put the url of the video</label>
    <input onChange={e=> shouldYoutubeBtnDisabled(e.currentTarget.value)} ref={youtubeUrlRef} 
      id="url" type="text" defaultValue={"https://www.youtube.com/watch?v="} placeholder="https://www.youtube.com/watch?v="
     required className="input w-full max-w-lg h-min mt-5 " />

    <button
     disabled={isYoutubeBtnDisabled}
     id="add-youtube"
     className="btn btn-active btn-accent mt-5" onClick={onYoutubeAdd}>Add Youtube</button>
  </label>
</label>





{/* test wegen dem neuen Idea with editable div */}
    {/* <div id="editor" role="textbox" contentEditable="true"  suppressContentEditableWarning={true} >
      <div data-text="true"></div>
    </div> */}

    </div>
  )
})



EditorTools.displayName = 'EditorTools';
export default EditorTools