import React, { createContext, useContext, useReducer } from "react";

const SET_LOGOUT = "setLogOut";
const TOGGLE_LOADER = "toggleLoader";
const SET_SESSION = "setSession";

const default_session = {
  token: null,
};
export const initialState = {
  session: default_session,
  showLoader: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGOUT:
      return {
        ...state,
        session: default_session,
      };
    case TOGGLE_LOADER:
      return {
        ...state,
        showLoader: !state.showLoader,
      };
    case SET_SESSION:
      return {
        ...state,
        session: { ...state.session, ...action.fields },
      };
    default:
      return {
        ...state,
      };
  }
};

/**
 * @type {React.Context<{session: {number: null, name: null, auth: null}, showLoader: boolean}>}
 */
export const StateContext = createContext(initialState);

/**
 * Provider
 * @param reducer
 * @param initialState
 * @param children
 * @returns {*}
 * @constructor
 */
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

/**
 * @returns {{showLoader: boolean, session: {*}, dispatch: function}}
 */
export const useGlobals = () => useContext(StateContext);

export const logoutAction = () => ({ type: SET_LOGOUT });
export const toggleLoaderAction = () => ({ type: TOGGLE_LOADER });
export const setSessionAction = (fields) => ({ type: SET_SESSION, fields });
