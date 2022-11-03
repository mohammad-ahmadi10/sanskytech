
import { ImBold } from 'react-icons/im';
import { ImItalic } from 'react-icons/im';
import { IconType } from 'react-icons/lib/esm/iconBase';
import styles from "@/styles/EditorTools.module.scss";
import { forwardRef, RefObject, FormEvent } from 'react';
import { exsitsRef  , beforeAfterSelection, executeChanges } from '@/src/utils/utilities';
import { makeBold } from './EditorTool/Bolder';



interface EditorToolsType {
  textAreaRef: RefObject<HTMLTextAreaElement> ,
  onEdit: (value:string) => void
}


const getIcon = (Icon:IconType , onIcon:()=>void) =>{
  return <div className={styles.icon} onClick={_ => onIcon()}>
            <Icon />
    </div>
  }
  
  
  
  
  
  
  const  EditorTools = forwardRef<HTMLTextAreaElement , EditorToolsType>(({textAreaRef , onEdit}, ref) => {
    const onNewEditChange = (textAreaRef: RefObject<HTMLTextAreaElement> , newValue:string ) =>{
      const textarea= textAreaRef.current!;
      textarea.value = newValue;
        onEdit(newValue)
       /// textarea.focus();
    }
    
    


    const getSepretedText = (textAreaRef:RefObject<HTMLTextAreaElement>) =>{
      const {value , selectionStart , selectionEnd } = textAreaRef.current!;
      const {selectedText , beforeSelection , afterSelection} =  beforeAfterSelection({value , selectionStart , selectionEnd });
      return {selectedText:selectedText , beforeSelection:beforeSelection , afterSelection:afterSelection};
    }


    
  const OnBoldClick = () =>{
    if(exsitsRef(textAreaRef)){
      const {selectedText , beforeSelection , afterSelection} = getSepretedText(textAreaRef);
      const {newValue , from , to} = makeBold(textAreaRef , selectedText , beforeSelection , afterSelection);
      onNewEditChange(textAreaRef , newValue);
      executeChanges(textAreaRef, from , to);
    }

 }

 




  return (
    <div className='bg-none text-white flex flex-row-reverse'>
        
        {getIcon(ImBold , OnBoldClick)}
        {/* {getIcon(ImItalic)}*/}


    </div>
  )
})



EditorTools.displayName = 'EditorTools';
export default EditorTools