import React,{createContext,useState,useContext} from 'react'
import Cookies from 'js-cookie';
export const Authcontext = createContext();
export const AuthProvider = ({children}) =>{
  const initialUserState = Cookies.get('jwt') || localStorage.getItem('Chatify') ;
  // parse the user data and store it in state
  const [ authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);
  return (
    <Authcontext.Provider value={{authUser,setAuthUser}}>
      {children}
    </Authcontext.Provider>
  );
  
};
export const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;