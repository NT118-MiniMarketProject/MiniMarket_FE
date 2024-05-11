import { createContext } from "react";


export type CredentialType = {
    provider: "firebase" | "password",
    user: any  
}

export type CredentialContextType = {
    credential: CredentialType | null,
    setCredential: React.Dispatch<React.SetStateAction<CredentialType | null>>,
};

export const CredentialContext = createContext<CredentialContextType>({
    credential: null, 
    setCredential: () => {}
});