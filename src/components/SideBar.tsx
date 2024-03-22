import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { getCategories } from "../api/api"
import Button from "./Button"
import { FaCaretDown, FaCaretRight, FaFolder } from "react-icons/fa"
import { FaCheck, FaX } from "react-icons/fa6"
import { TCategory } from "../types"
import clsx from "clsx"

function SideBar() {
  const [categories, setCategories] = useState<TCategory[] | []>([])
  const [show, setShow] = useState(false)
  const [input, setInput] = useState("")

  const { categoryId } = useParams()
  const location = useLocation()

  const fetchCategories = async () => {
    const data: TCategory[] = await getCategories()

    if (data) {
      setCategories(data)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const isActive = (path: string) => {
    if (!categoryId) {
      return false
    } else {
      return location.pathname === path
    }
  }

  const toggleHandler = () => {
    setShow(true)
  }

  const createCategory = async () => {
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input,
        notes: [],
      }),
    })

    if (response.ok) {
      const newCategory = await response.json()
      setCategories([...categories, newCategory])
      setInput("")
      setShow(false)
    } else {
      console.error("Failed to create category")
    }
  }

  return (
    <div className="w-full max-w-72 flex flex-col gap-2 overflow-y-scroll pb-10 pl-2 bg-white m-2 rounded-md">
      {show ? (
        <div className="my-2 flex items-center w-full gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a title"
            className="w-3/4 px-2 bg-gray-100"
          />
          <div className="flex gap-1">
            <FaCheck
              className="bg-[#71CF48] text-white text-2xl p-1 cursor-pointer"
              onClick={() => createCategory()}
            />
            <FaX
              className="bg-[#FE4C4A] text-white text-2xl p-1 cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
      ) : (
        <div className="w-full pr-2 mt-2">
          <Button
            variant="create"
            text="Create Category"
            handler={toggleHandler}
          />
        </div>
      )}
      <div className="mr-2 space-y-2">
        {categories.map((category) => (
          <Link
            to={
              location.pathname === `/${category.id}` ? "/" : `/${category.id}`
            }
            key={category.id}
            className={clsx(
              "flex gap-2 p-2 rounded-md",
              isActive(`/${category.id}`) ? "bg-[#F8F8FA]" : "bg-[#1264A3]"
            )}
          >
            <div className="flex gap-2 items-center">
              <FaFolder
                className={clsx(
                  "text-xl",
                  isActive(`/${category.id}`) ? "text-[#323338]" : "text-white"
                )}
              />
              <span
                className={clsx(
                  isActive(`/${category.id}`) ? "text-[#323338]" : "text-white"
                )}
              >
                {category.name}
              </span>
            </div>
            {isActive(`/${category.id}`) ? (
              <FaCaretRight className="ml-auto text-xl  text-[#323338]" />
            ) : (
              <FaCaretDown className="ml-auto text-xl text-white" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideBar
