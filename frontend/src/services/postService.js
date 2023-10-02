const baseApiURL = import.meta.env.VITE_API_URL

export const getRandomPostService = async () => {
  const res = await fetch(`${baseApiURL}/`)
  const randomPost = await res.json()
  return randomPost
}
