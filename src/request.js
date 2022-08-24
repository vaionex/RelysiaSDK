const { baseURL } = require("./config");
const { default: axios } = require("axios");

class Request {
  constructor(token) {
    this.headers = {
      "content-type": "application/json",
      accept: "application/json",
      ...(token && {authToken: token})
    };
  }

  async postRequest(url, data, config) {
    const response = await axios.post(baseURL + url, data, {
      headers: {
        ...this.headers,
        ...config,
      },
    });
    if (response.status < 400) {
      return response.data;
    } else {
      const error = new Error();
      error.info = response.data;
      return error;
    }
  }

  async putRequest(url, data, config) {
    const response = await axios.put(baseURL + url, data, {
      headers: {
        ...this.headers,
        ...config,
      },
    });
    if (response.status < 400) {
      return response.data;
    } else {
      const error = new Error();
      error.info = response.data;
      return error;
    }
  }
  
  async getRequest(url, config) {
    const response = await axios.get(baseURL + url, {
      headers: {
        ...this.headers,
        ...config,
      },
    });
    if (response.status < 400) {
      return response.data;
    } else {
      const error = new Error();
      error.info = response.data;
      return error;
    }
  }

  async deleteRequest(url, config) {
    const response = await axios.delete(baseURL + url, {
      headers: {
        ...this.headers,
        ...config,
      },
    });
    if (response.status < 400) {
      return response.data;
    } else {
      const error = new Error();
      error.info = response.data;
      return error;
    }
  }
}

module.exports = Request;
