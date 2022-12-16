import { ImageContentType } from "@/src/pattern/command-pattern/commands-pattern";


const getImage = ({url, alt, width , height, position}:ImageContentType) => {
    return `<Image alt="${alt}" src="${url}" width={${width}} height={${height}} position={"${position}"} />`
    
}


export const addImage = (content:ImageContentType , beforeSelection:string , afterSelection:string, selectionStart:number) => {
    
    const embadeImage = getImage(content);

    /* const linenumber = (beforeSelection+afterSelection).substring(0, selectionStart).split("\n").length;
    const selectedLine = (beforeSelection+afterSelection).split("\n")[linenumber-1]
 */
    let newValue  = beforeSelection  + 
                    embadeImage + 
                    afterSelection;

    const from = beforeSelection.length ;
    const to = embadeImage.length  + from;
    return {newValue , from , to};


}