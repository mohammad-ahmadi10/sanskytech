
import { Command } from './commands-pattern';
import { CommandType, textRef } from '@/types/createblogtypes';
import { applyRechanges } from '@/src/utils/utilities';


export class UndoCommand implements Command {
    commandValue: CommandType; 
    texteditorRef: textRef; 
    constructor(texteditorRef:textRef, commandValue:CommandType){
      this.texteditorRef = texteditorRef;
      this.commandValue = commandValue;
    }
    execute = () => this.texteditorRef.current!.value;
    undo = () => applyRechanges(this.texteditorRef, this.commandValue);
    redo = () => applyRechanges(this.texteditorRef, this.commandValue);
}



