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

  async postRequest(reqUrl, data, config, isAdmin) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/v1/${reqUrl}`;
    } else {
      url += `/v1/${reqUrl}`;
    }
    const response = await axios.post(url, data, {
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

  async putRequest(reqUrl, data, config) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/v1/${reqUrl}`;
    } else {
      url += `/v1/${reqUrl}`;
    }
    const response = await axios.put(url, data, {
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

  async getRequest(reqUrl, config) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/v1/${reqUrl}`;
    } else {
      url += `/v1/${reqUrl}`;
    }
    const response = await axios.get(url, {
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

  async deleteRequest(reqUrl, config) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/v1/${reqUrl}`;
    } else {
      url += `/v1/${reqUrl}`;
    }
    const response = await axios.delete(url, {
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
