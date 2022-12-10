const getYoutube = (url:string) => {    
    return `<YouTube id={"${url}"}/>`
}


export const addYoutube = (url:string , beforeSelection:string , afterSelection:string, selectionStart:number) => {
    const id = extractId(url);
    const embadedYoutube = getYoutube(id);

    let newValue  = beforeSelection  + 
                    embadedYoutube + 
                    afterSelection;

    const from = beforeSelection.length ;
    const to = embadedYoutube.length  + from;
    return {newValue , from , to};


}

function extractId(url: string) {
     const id = url.split("v=")[1];
     return id;
}
