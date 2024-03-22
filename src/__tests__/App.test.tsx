import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import SideBar from "../components/SideBar"
import * as api from "../api/api"

describe("SideBar component", () => {
  it("renders sidebar with 'Create Category' button", async () => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    )
    const createCategoryButton = screen.getByText("Create Category")
    expect(createCategoryButton).toBeInTheDocument()
  })

  // TODO: npm run server to test
  it("fetches categories and renders them in the menu", async () => {
    const mockCategories = [
      { id: "1", title: "Work", notes: [] },
      { id: "2", title: "Personal", notes: [] },
    ]
    const getCategoriesSpy = vi
      .spyOn(api, "getCategories")
      .mockResolvedValue(mockCategories)

    getCategoriesSpy.mockResolvedValue(mockCategories)

    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    )

    vi.waitFor(() => {
      expect(screen.getByText("Work")).toBeInTheDocument()
    })
  })
})

it("fetches a category by id", async () => {
  const mockCategory = {
    id: "1",
    name: "Work",
    notes: [
      {
        id: "86679a44-17d5-41d2-a304-cab48722bf17",
        title: "Finish the test project",
        text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
    ],
  }
  const getCategoryByIdSpy = vi
    .spyOn(api, "getCategoryById")
    .mockResolvedValue(mockCategory)

  render(
    <MemoryRouter>
      <SideBar />
    </MemoryRouter>
  )

  vi.waitFor(() => {
    expect(getCategoryByIdSpy).toHaveBeenCalledWith("1")
    expect(screen.getByText("Finish the test project")).toBeInTheDocument()
  })
})
