const API_URL = "http://smktesting.herokuapp.com";
const STATIC_URL = "http://smktesting.herokuapp.com/static";

const api = {
  /**
   * @param {*} username
   * @param {*} password
   * @returns Promise<{success: boolean, token: string}>
   */
  async register(username, password) {
    return api._post("register", { username, password });
  },
  /**
   * @param {*} username
   * @param {*} password
   * @returns Promise<{success: boolean, token: string}>
   */
  async login(username, password) {
    return api._post("login", { username, password });
  },
  /**
   * @returns Promise<Array<{id: number, title: string, image: string, text: string}>>
   */
  async products() {
    try {
      const results = await api._get("products").then((res) => res.json());
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
  _post(resourcePath, body) {
    return fetch(`${API_URL}/api/${resourcePath}/`, {
      method: "POST",
      headers: api._headers,
      body,
    });
  },
  _get(resourcePath) {
    return fetch(`${API_URL}/api/${resourcePath}/`, {
      method: "GET",
      headers: api._headers,
    });
  },
};

export default api;
