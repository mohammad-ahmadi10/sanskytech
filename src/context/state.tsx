import { createContext , ReactNode, useContext, useState } from "react";


interface GlobalContextProps{
    editorValue: string ,
    defaultTheme: string,
    setDefaultTheme: (theme:string) => void
}

export const GlobalContext = createContext<GlobalContextProps>({
    editorValue:"",
    defaultTheme: "light",
    setDefaultTheme: (_:string) => {}
});


export const ContextProvider = ({children}:any) =>{
    const [defaultTheme , setDefaultTheme] = useState<string>("light");

    
    return <GlobalContext.Provider value={{editorValue:"", defaultTheme , setDefaultTheme }}>
                {children}
            </GlobalContext.Provider>
}
