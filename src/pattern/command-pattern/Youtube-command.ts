
import { Command, CommandType, ImageContentType } from './commands-pattern';
import { textRef } from '@/types/createblogtypes';
import { applyRechanges, exsitsRef, getSepretedText } from '@/src/utils/utilities';
import { addImage } from './../../components/EditorTool/Image';
import { addYoutube } from '@/src/components/EditorTool/Youtube';



export class YoutubeCommand implements Command {
    commandValue: CommandType; 
    texteditorRef: textRef;
    url: string;

    constructor(texteditorRef:textRef , url:string){
      this.texteditorRef = texteditorRef;
      this.commandValue = {value:texteditorRef.current!.value , selectedRange:[texteditorRef.current!.selectionStart , texteditorRef.current!.selectionEnd]};
      this.url = url;
    }



    execute(): string {
        if(exsitsRef(this.texteditorRef)){
            const { beforeSelection , afterSelection, selectionStart} = getSepretedText(this.texteditorRef);
            const {newValue, from , to} = addYoutube( this.url,  beforeSelection , afterSelection, selectionStart);
            this.commandValue.selectedRange = [this.texteditorRef.current!.selectionStart , this.texteditorRef.current!.selectionEnd];
            
            this.texteditorRef.current!.value = newValue;
            this.texteditorRef.current!.setSelectionRange(from , to);
            this.texteditorRef.current!.focus();
            return newValue;
          }
          
          return "";

    }
    undo = () => applyRechanges(this.texteditorRef, this.commandValue);
    redo = () => applyRechanges(this.texteditorRef, this.commandValue);
}

