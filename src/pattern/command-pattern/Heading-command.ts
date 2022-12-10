
import { Command, CommandType } from './commands-pattern';
import { textRef } from '@/types/createblogtypes';
import { applyRechanges, exsitsRef, getSepretedText } from '@/src/utils/utilities';
import { makeHeading } from '../../components/EditorTool/Heading';



export class HeadingCommand implements Command {
    commandValue: CommandType; 
    texteditorRef: textRef;
    headingType: string;
    constructor(texteditorRef:textRef, headingType:string){
      this.texteditorRef = texteditorRef;
      this.headingType = headingType;
      this.commandValue = {value:texteditorRef.current!.value , selectedRange:[texteditorRef.current!.selectionStart , texteditorRef.current!.selectionEnd]};
    }



    execute(): string {
        if(exsitsRef(this.texteditorRef)){
            const {selectedText , beforeSelection , afterSelection, selectionStart} = getSepretedText(this.texteditorRef);
            const {newValue , from , to} = makeHeading( this.headingType , selectedText , beforeSelection , afterSelection, selectionStart);

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

