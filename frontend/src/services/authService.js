const baseApiURL = import.meta.env.VITE_API_URL

export const signUpService = async ({ username, email, password, fullName }) => {
  const res = await fetch(`${baseApiURL}/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password,
      fullName
    })
  })
  const body = await res.json()
  return body
}
