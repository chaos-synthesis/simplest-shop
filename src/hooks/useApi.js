import React from "react";
import { useGlobals } from "../contexts/Global";

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
      };
    case "fetchRequest":
      return {
        loading: true,
        data: [],
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
  const [{ data, loading }, dispatch] = React.useReducer(reducer, {
    loading: immediate,
    data: [],
  });
  const [error, setError] = React.useState(0);
  const [{ session }] = useGlobals();

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
          isSubscribed && setError((error) => error + 1);
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
