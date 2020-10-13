import React from "react";
import { useGlobals, logoutAction } from "../contexts/Global";

/**
 * @param state
 * @param action
 * @returns {{loading: boolean}|{data: *, loading: boolean}}
 */
function reducer(state, action) {
  switch (action.type) {
    case "fetchResponse":
      return {
        loading: false,
        data: action.data,
        error: action.error || null,
      };
    case "fetchRequest":
      return {
        loading: true,
        data: [],
        error: null,
      };
    default:
      throw new Error("action.type is not defined inside reducer's switch");
  }
}

/**
 * @param apiMethodFn {(function(): Promise), immediate?: boolean}
 * @returns {{data: *, setLoading: (function(): void), loading: *, error: number}}
 */
const useApi = (apiMethodFn, immediate = true) => {
  const [{ data, loading, error }, dispatch] = React.useReducer(reducer, {
    loading: immediate,
    data: [],
    error: null,
  });
  const [{ session }, dispatchGlobal] = useGlobals();

  const setLoading = () => {
    dispatch({ type: "fetchRequest" });
  };

  React.useEffect(() => {
    let isSubscribed = true;

    if (loading) {
      apiMethodFn().then(
        (res) => {
          isSubscribed && dispatch({ type: "fetchResponse", data: res });
          console.log("useApi cb: ", res);
        },
        (e) => {
          console.error("useApi error: ", e);
          isSubscribed && dispatch({ type: "fetchResponse", error: e.message });

          if (e.code === 401) {
            dispatchGlobal(logoutAction());
          }
        }
      );
    }

    return () => {
      isSubscribed = false;
    };
  }, [loading]);

  return { data, loading, error, setLoading: () => setLoading() };
};

export default useApi;
