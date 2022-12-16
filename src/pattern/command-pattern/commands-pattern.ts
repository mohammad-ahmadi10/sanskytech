
/* export interface CommandManager<REF , T> { 
    undoStack:Command<REF>[] ;
    redoStack:Command<REF>[] ;
    execute ( command : Command<REF> ) : void ;
    undo ( ) : void ;
    redo ( ) : void ;
 } */

 export type CommandType ={
    value: string,
    selectedRange: [number , number]
  }

export type ImageContentType = {
    url:string,
    alt:string,
    width:number,
    height:number,
    position:string
}

export interface Command {
    execute(): string;
    undo(): string,
    redo(): string
}

