import { createContext, useState, useEffect } from "react";

export const RedirectToBookListContext = createContext();

export const BooksLinkProvider = ({children})=>{
    const [allBookLink, setAllBookLink] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchCat, setSearchCat] = useState('');
   
    

    return (
        <RedirectToBookListContext.Provider value={{allBookLink, setAllBookLink, searchText, setSearchText, searchCat, setSearchCat}}>
            {children}
        </RedirectToBookListContext.Provider>
    )
};