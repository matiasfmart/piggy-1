import { createContext } from "react";

const defaultAuth = null;

const AuthContext = createContext(defaultAuth)

export default AuthContext
export {
  defaultAuth
}