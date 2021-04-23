/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [Auth, setAuth] = useState({token:false, username:''});

  return (
    <Context.Provider value={{ Auth, setAuth }}>
      {children}
    </Context.Provider>
  );
}

export function useContextProvider() {
  const context = useContext(Context);
  const { Auth, setAuth } = context;
  return { Auth, setAuth };
}
