import { createContext } from "react";

interface userContext {
  name: string;
  userId: string;
  role: string;
}

export type CredentialType = {
  provider: "firebase" | "password";
  user: any;
  expiredTime: number;
};

export type CredentialContextType = {
  credential?: CredentialType | null;
  setCredential: React.Dispatch<React.SetStateAction<CredentialType | null>>;
};

export const CredentialContext = createContext<CredentialContextType>({
  credential: null,
  setCredential: () => {},
});
