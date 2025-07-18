import { createContext, useContext, useState } from "react";

type HeaderContextType = {
    title: string;
    setTitle: (title: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);


export function HeaderProvider({children}: {children: React.ReactNode}) {
    const [title, setTitle] = useState<string>("Dashboard");

    return (
        <HeaderContext.Provider value={{title, setTitle}}>
            {children}
        </HeaderContext.Provider>
    )
}


export function useHeader(){
    const context = useContext(HeaderContext);
    if(!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
}