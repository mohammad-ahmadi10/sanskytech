import { isSelectedTextEmpty} from "@/src/utils/utilities";



export const  makeBold =  (selectedText:string , beforeSelection:string , afterSelection:string) =>{

    // text is already surrouned by ** **  
    const fromText = beforeSelection.slice(beforeSelection.length -2 , beforeSelection.length );
    const toText = afterSelection.slice(0 , 2);
    
    let embededValue = isSelectedTextEmpty(selectedText) ? "Bold text" : selectedText;

    let newValue:string;
    let from:number , to:number;
    // 
    if(fromText === "**" && toText === "**"){
      newValue = beforeSelection.slice(0 , beforeSelection.length - 2) + embededValue + afterSelection.slice(2, afterSelection.length);
      from = beforeSelection.slice(0 , beforeSelection.length - 2).length; 
      to = embededValue.length  + from;
    }
    else 
    {
      from = beforeSelection.length -1 + 3;
      if(embededValue.slice(embededValue.length -1) === " " && 
         embededValue.slice(0,1) !== " "
      ){
        embededValue = "**" + embededValue.trim() + "** ";
        to = embededValue.length - 5 + from;
      }
      else if(embededValue.slice(0,1) === " " && 
              embededValue.slice(embededValue.length -1) !== " "
            ){
        embededValue = " **" + embededValue.trim() + "**";
        from = beforeSelection.length -1 + 4;
        to = embededValue.length - 5 + from;
      } 
      else {
        embededValue = "**" + embededValue.trim() + "**";
        from = beforeSelection.length -1 + 3;
        to = embededValue.length - 4 + from;
      }
      newValue = beforeSelection + embededValue + afterSelection;
    }
    return {newValue , from , to};
}