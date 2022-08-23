const axios = require('axios');

const Axios = async (method, url, headers, data) => {
  const request = {};
  request.method = method;
  request.url = url;
  request.headers = headers;
  if (typeof method === 'string' && method.toLowerCase() !== 'get') {
    request.data = data;
  }
  const response = await axios(request);
  if (response.status < 400) {
    return response.data;
  } else {
    const error = new Error();
    error.info = response.data;
    return error;
  }
};

module.exports = Axios;
