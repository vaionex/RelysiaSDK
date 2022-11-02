const {baseURL} = require('./config');
const {default: axios} = require('axios');

class Request {
  constructor() {
    this.headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
    };

    this.version = {
      V1: 'v1',
      V2: 'v2',
    };
  }


  async postRequest(reqPath, data, config, isAdmin, version = this.version.V1) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/${version}${reqPath}`;
    } else {
      url += `/${version}${reqPath}`;
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

  async putRequest(reqPath, data, config, isAdmin, version = this.version.V1) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/${version}${reqPath}`;
    } else {
      url += `/${version}${reqPath}`;
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

  async getRequest(reqPath, config, isAdmin, version = this.version.V1) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/${version}${reqPath}`;
    } else {
      url += `/${version}${reqPath}`;
    }

    if (config.query) {
      url += config.query;
    }

    const response = await axios.get(url, {
      headers: {
        ...this.headers,
        ...config.headers,
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

  async deleteRequest(reqPath, config, isAdmin, version = this.version.V1) {
    let url = baseURL;
    if (isAdmin) {
      url += `/admin/${version}${reqPath}`;
    } else {
      url += `/${version}${reqPath}`;
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
