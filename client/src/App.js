import React from "react";
import './App.css'

import {useRouts} from "./route";
import {useAuth} from "./Hooks/authentication.hook";
import {AuthContext} from "./Context/auth.context";
import Header from "./Components/Header/header";
import Navbar from "./Components/NavBar/navBar";
import {UserContext} from "./Context/user.context";
import {useUsers} from "./Hooks/users.hook";


function App(props) {
    const {users} = useUsers();
    const {token,login,logout,userId,userRole,userName,userSettings} = useAuth();
    const isAuth = !!token;
    const routs = useRouts(isAuth,userRole,props);
    let navBar = null
    if(isAuth){
        navBar = <Navbar />
    }

  return (
      <AuthContext.Provider value={{
          token,login,logout,userId,userRole,isAuth,userName,userSettings
      }}>
          <div className="App">
              <Header  />
              <UserContext.Provider value={users} >
                  {navBar}
                  <div className="content">
                    {routs}
                  </div>
              </UserContext.Provider>
          </div>

      </AuthContext.Provider>
  );
}

export default App;
