import { render, screen } from "@testing-library/react"
import { expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"
import Layout from "../components/Layout"

it("renders layout and finds the needed text", async () => {
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  )
  const createCategoryButton = screen.getByText("Your Notes")
  expect(createCategoryButton).toBeInTheDocument()
})
