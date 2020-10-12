import { get } from "lodash";

const API_URL = "http://smktesting.herokuapp.com";
const STATIC_URL = "http://smktesting.herokuapp.com/static";

const api = {
  /**
   * @param {*} token
   */
  setToken(token) {
    api._token = token;
  },
  /**
   * @param {*} username
   * @param {*} password
   * @returns Promise<{success: boolean, token: string}>
   */
  async register(username, password) {
    const result = await api._post("register", { username, password });
    api._token = get(result, "token", null);
    return result;
  },
  /**
   * @param {*} username
   * @param {*} password
   * @returns Promise<{success: boolean, token: string}>
   */
  async login(username, password) {
    const result = await api._post("login", { username, password });
    api._token = get(result, "token", null);
    return result;
  },
  /**
   * @returns Promise<Array<{id: number, title: string, image: string, text: string}>>
   */
  async products() {
    try {
      const results = await api._get("products");
      return results.map((product) => ({
        ...product,
        image: `${STATIC_URL}/${product.img}`,
      }));
    } catch (error) {
      throw error;
    }
  },
  /**
   * @param {*} productId
   * @param {*} rate
   * @param {*} text
   * @returns Promise<{review_id: number}>
   */
  async postReview(productId, rate, text) {
    return api._post(`reviews/${productId}`, { rate, text });
  },
  /**
   * @param {*} productId
   * @returns Promise<{id: number, product: number, rate: number, text: string, created_by: {id: number, username: string}}>
   */
  async reviews(productId) {
    return api._get(`reviews/${productId}`);
  },
  ////////////// PRIVATE SECTION //////////////
  _token: null,
  get _headers() {
    return {
      "Content-Type": "application/json;charset=utf-8",
      ...(api._token ? { Authorization: `Token ${api._token}` } : {}),
    };
  },
  async _post(resourcePath, body) {
    const res = await fetch(`${API_URL}/api/${resourcePath}`, {
      method: "POST",
      headers: api._headers,
      body,
    });
    return await res.json();
  },
  async _get(resourcePath) {
    const res = await fetch(`${API_URL}/api/${resourcePath}`, {
      method: "GET",
      headers: api._headers,
    });
    return await res.json();
  },
};

export default api;
