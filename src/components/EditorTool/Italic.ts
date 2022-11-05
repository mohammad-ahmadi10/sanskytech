
import { isSelectedTextEmpty } from '@/src/utils/utilities';


export const makeItalic = (selectedText:string , beforeSelection:string , afterSelection:string) => {
    const fromText = beforeSelection.slice(beforeSelection.length -1 , beforeSelection.length );
    const toText = afterSelection.slice(0 , 1);
    
    let embededValue = isSelectedTextEmpty(selectedText) ? "Italic text" : selectedText;

    let newValue:string;
    let from:number , to:number;
    // 
    if(fromText === "_" && toText === "_"){
      newValue = beforeSelection.slice(0 , beforeSelection.length - 1) + embededValue + afterSelection.slice(1, afterSelection.length);
      from = beforeSelection.slice(0 , beforeSelection.length - 1).length; 
      to = embededValue.length  + from;
    }
    else 
    {
      from = beforeSelection.length -1 + 2;

      // after  has a space ?
      if(embededValue.slice(embededValue.length -1) === " " && 
         embededValue.slice(0,1) !== " "
      ){
        embededValue = "_" + embededValue.trim() + "_ ";
        to = embededValue.length - 3 + from;
      }
      // before has a space?
      else if(embededValue.slice(0,1) === " " && 
              embededValue.slice(embededValue.length -1) !== " "
            ){
        embededValue = " _" + embededValue.trim() + "_";
        from = beforeSelection.length -1 + 3;
        to = embededValue.length - 3 + from;
      } 
      else {
        embededValue = "_" + embededValue.trim() + "_";
        from = beforeSelection.length -1 + 2;
        to = embededValue.length - 2 + from;
      }
      newValue = beforeSelection + embededValue + afterSelection;
    }
    return {newValue , from , to};


}