/**
 * Function used to build fetch options
 * @param {string} method used to set request method
 * @param {Object} body used to set body for request
 * @return {Object} prepared options to make request
 */
export default (method, body) => ({
  method,
  headers: {
    mode: 'cors',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With'
  },
  body
})
