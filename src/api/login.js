const endpoint = 'https://reqres.in/api/login'

export default async function loginAPI(user) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      mode: 'cors',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With'
    },
    body: JSON.stringify({
      // eve.holt@reqres.in
      email: user.email,
      password: user.password
    })
  })
  if (!response.ok) throw new Error("Token wasn't returned")
  const res = await response.json()
  return res.token
}
