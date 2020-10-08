import React, { createContext, useContext, useReducer } from "react";

const default_session = {};
export const initialState = {
  session: default_session,
  showLoader: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setLogOut":
      return {
        ...state,
        session: default_session,
      };
    case "toggleLoader":
      return {
        ...state,
        showLoader: !state.showLoader,
      };
    case "setSession":
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
 * @returns {{showLoader: boolean}}
 */
export const useGlobals = () => useContext(StateContext);
