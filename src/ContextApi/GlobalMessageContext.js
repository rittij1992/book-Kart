import { createContext, useEffect, useState } from "react";

export const GlobalMessageContext = createContext();

export const GlobalMessageProvider = ({children})=>{
    const [GlobalMessageToken, setGlobalMessageToken] = useState(()=>{
        const storedGlobalMessage = localStorage.getItem("GlobalMessageToken");
        return storedGlobalMessage ? JSON.parse(storedGlobalMessage) : null;
    })
    
    useEffect(()=>{
        if(GlobalMessageToken){
            localStorage.setItem("GlobalMessageToken", JSON.stringify(GlobalMessageToken))
        }else{
            localStorage.removeItem("GlobalMessageToken")
        }
    }, [GlobalMessageToken])

    return (
        <GlobalMessageContext.Provider value={{GlobalMessageToken, setGlobalMessageToken}}>
            {children}
        </GlobalMessageContext.Provider>
    )

};