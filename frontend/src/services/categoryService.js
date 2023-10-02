const baseApiURL = import.meta.env.VITE_API_URL

export const listCategoriesService = async () => {
  const res = await fetch(`${baseApiURL}/categories`)
  const categories = await res.json()
  return categories
}
