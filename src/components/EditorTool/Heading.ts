
import { isSelectedTextEmpty } from '@/src/utils/utilities';


export const makeHeading = (headingType:string ,selectedText:string , _beforeSelection:string , 
                           _afterSelection:string, selectionStart:number) => {
                               
                         
    let beforeSelection = _beforeSelection;
    let afterSelection = _afterSelection;
    
    const linenumber = (beforeSelection+selectedText+afterSelection).substring(0, selectionStart).split("\n").length;
    const selectedLine = (beforeSelection+selectedText+afterSelection).split("\n")[linenumber-1]
    const hasBeforeContent = selectedLine.indexOf(selectedText) !== 0;
    let embededValue = isSelectedTextEmpty(selectedText) ? headingType : selectedText;
    const isAlreadyHeaded = selectedLine.slice(0,1) === "#" ;


    let newValue:string;
    let from:number , to:number;
    // 
    
    
    let ambededChar = `#`;
      switch(headingType){
        case 'Heading 1':
            ambededChar = `#`;
          break;
        case 'Heading 2':
            ambededChar = `##`;
          break;
        case 'Heading 3':
            ambededChar = `###`;
          break;
        case 'Heading 4':
            ambededChar = `####`;
          break;
        case 'Heading 5':
            ambededChar = `#####`;
          break;
          
      }



    if(isAlreadyHeaded){
        let howManyHashtag = 0;

        for (let index = 0; index < selectedLine.length; index++) {
            const element = selectedLine[index];
            if(element === "#"){
                howManyHashtag++;
            }
        }
        let allContent = (beforeSelection+selectedText+afterSelection).split("\n");
        allContent[linenumber-1] = selectedLine.slice(howManyHashtag+1, selectedLine.length);
        
        allContent[linenumber-1] = ambededChar + " " + allContent[linenumber-1];

        newValue = allContent.join("\n");
        from = selectionStart - howManyHashtag  + ambededChar.length ;
        to = from + selectedText.length;
    }
    
    else {

        from = beforeSelection.length -1;
        
      const beforeContent = hasBeforeContent ? `\n${ambededChar} `: ambededChar + " ";
      
      
      // after  has a space ?
      if(embededValue.slice(embededValue.length -1) === " " && 
      embededValue.slice(0,1) !== " "
      ){
          embededValue = beforeContent + embededValue.trim() + " ";
          from = beforeSelection.length + ambededChar.length + (hasBeforeContent ? 2 : 1) ;
          to = embededValue.length + afterSelection.split("\n")[0].length + from - ambededChar.length - 2;
        }
        // before has a space?
        else if(embededValue.slice(0,1) === " " && 
        embededValue.slice(embededValue.length -1) !== " "
        ){
                embededValue = beforeContent + embededValue.trim() + " ";
                from = beforeSelection.length + ambededChar.length + 2 ;
                to = embededValue.length + afterSelection.split("\n")[0].length + from - ambededChar.length - 3;
                
            } 
            else {
                embededValue = beforeContent + embededValue.trim() + " ";
                
                from = beforeSelection.length + ambededChar.length + 1;
                to = embededValue.length + afterSelection.split("\n")[0].length + from - ambededChar.length - 2;
                
            }
            
            
            newValue = beforeSelection + embededValue + afterSelection;
            
    }
            return {newValue , from , to};
            
            
}