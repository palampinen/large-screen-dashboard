import 'whatwg-fetch';
const CROSS_ORIGIN_URL = 'https://crossorigin.me/';


function generalFetch(getUrl, getParams) {

  let url = `${CROSS_ORIGIN_URL}${getUrl}`;
  if (getParams) {
    url += '?' + Object.keys(getParams).map(k => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(getParams[k]);
    }).join('&');
  }


	const opts = { headers: {} };
  opts.headers.Accept = 'application/json';
  opts.headers['content-type'] = 'application/json; charset=utf-8';
  opts.headers['x-requested-with'] = 'XMLHttpRequest';

  return fetch(url, opts)
}

export const dataFetch = (url, params) => {
	return generalFetch(url, params)
  .then(response => {
    // If server responds with error, it is thrown
    if (isErrorResponse(response.status)) {
      const error = new Error(response.statusText);
      error.response = response;
      error.status = response.status;
      throw error;
    }

    return response.json();
  })
  .catch(error => {
    if (error.response) {
      // Re-throw server errors
      throw error;
    }
    return Promise.reject(null);
  });
}

function isErrorResponse(status) {
  return status && status >= 400;
}
