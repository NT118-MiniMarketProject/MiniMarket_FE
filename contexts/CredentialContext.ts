import { Dispatch, SetStateAction, createContext } from "react";


type CredentialContextType = {
    credential: any,
    setCredential: any,
};
export const CredentialContext = createContext<CredentialContextType>({credential: null, setCredential: () => {}});