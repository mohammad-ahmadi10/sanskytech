
import { Command, CommandType } from './commands-pattern';
import { textRef } from '@/types/createblogtypes';
import { applyRechanges, exsitsRef, getSepretedText } from '@/src/utils/utilities';
import { makeBold } from '@/src/components/EditorTool/Bolder';
import { makeItalic } from '@/src/components/EditorTool/Italic';



export class ItalicCommand implements Command {
    commandValue: CommandType; 
    texteditorRef: textRef;
    constructor(texteditorRef:textRef){
      this.texteditorRef = texteditorRef;
      this.commandValue = {value:texteditorRef.current!.value , selectedRange:[texteditorRef.current!.selectionStart , texteditorRef.current!.selectionEnd]};
    }



    execute(): string {
        if(exsitsRef(this.texteditorRef)){
            const {selectedText , beforeSelection , afterSelection} = getSepretedText(this.texteditorRef);
            const {newValue , from , to} = makeItalic(selectedText , beforeSelection , afterSelection);
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

