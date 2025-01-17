import React from "react";
import axiosInstance from '../axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("refresh_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  console.log(context)
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, parseJwt };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  if (!login || !password) {
    setError(true);
    return;
  }
  
  setIsLoading(true); // Start loading

  axiosInstance
    .post(`login/`, {
      email: login,
      password: password,
    })
    .then((res) => {
      setError(false); // Reset error state
      setIsLoading(false); // Stop loading

      // Store tokens
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

      const userInfo = parseJwt(localStorage.getItem('access_token'));
      const is_staff = userInfo.is_staff;

      dispatch({ type: 'LOGIN_SUCCESS' });

      if (is_staff) {
        history.push('/app/dashboard');
      } else {
        history.push('/app/tables');
      }
    })
    .catch((error) => {
      setError(true); // Set error state if login fails
      setIsLoading(false); // Stop loading
      console.log(error.response);
    });
}

function signOut(dispatch, history) {
  axiosInstance
    .post('logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    .then(() => {
      // Clear localStorage and axios headers
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.clear();
      axiosInstance.defaults.headers['Authorization'] = null;

      // Dispatch the sign-out action and redirect
      dispatch({ type: "SIGN_OUT_SUCCESS" });
      history.push("/login");
    })
    .catch((error) => {
      console.log(error.response);
    });
}
