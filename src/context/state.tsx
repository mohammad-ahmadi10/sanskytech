import { createContext , ReactNode, useContext } from "react";


interface GlobalContextProps{
    editorValue: string 
}

export const GlobalContext = createContext<GlobalContextProps>({
    editorValue:""
});

export const ContextProvider = ({children}:any) =>{
    
    return <GlobalContext.Provider value={{editorValue:""}}>
                {children}
            </GlobalContext.Provider>
}
