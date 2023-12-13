// tokenManager.js

export const TokenManager = {
  setToken: function (token) {
    localStorage.setItem('token', token);
  },

  getToken: function () {
    return localStorage.getItem('token');
  },

  removeToken: function () {
    localStorage.removeItem('token');
  },

  isAuthenticated: function () {
    return this.getToken() !== null;
  },

  base64UrlDecode: function (base64Url) {
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  },

  decodeJwtToken: function (token) {
    const [header, payload, signature] = token.split(".");

    const decodedHeader = JSON.parse(this.base64UrlDecode(header));
    const decodedPayload = JSON.parse(this.base64UrlDecode(payload));

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature,
    };
  },
};
