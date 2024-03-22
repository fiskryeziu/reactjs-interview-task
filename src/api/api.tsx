import { TCategory } from "../types"

export const getCategories = async () => {
  const res = await fetch("http://localhost:3000/categories/", {
    method: "GET",
  })
  if (!res.ok) {
    console.error("Failed to fetch category")
    return
  }

  return res.json()
}

export const getCategoryById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/categories/${id}`, {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch category")
  }

  return res.json()
}

export const updateCategoriesbyId = async (id: string, data: TCategory) => {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response
}
