import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { TNote } from "../types"
import Button from "./Button"
import { useParams } from "react-router-dom"
import { getCategoryById, updateCategoriesbyId } from "../api/api"

function CreateNote({
  setNotes,
  toggle,
}: {
  setNotes: (value: TNote[]) => void
  toggle: (v: boolean) => void
}) {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const { categoryId } = useParams()

  const createHandler = async () => {
    if (categoryId) {
      const category = await getCategoryById(categoryId)
      const newNote = { id: uuidv4(), title, text }
      const updatedNotes: TNote[] = [...category.notes, newNote]
      const updatedCategory = { ...category, notes: updatedNotes }

      const response = await updateCategoriesbyId(categoryId, updatedCategory)
      if (response.ok) {
        setNotes(updatedNotes)
        setTitle("")
        setText("")
        toggle(false)
      } else {
        console.error("Failed to update category with new note")
      }
    } else {
      console.error("Category id is undefined")
    }
  }
  return (
    <div>
      <div className="flex justify-between mt-2 relative">
        <div className="flex gap-3">
          <span className="px-10 py-2 bg-blue-500 rounded-sm"></span>
          <span className="px-10 py-2 bg-blue-500 rounded-sm"></span>
          <span className="px-10 py-2 bg-green-500 rounded-sm"></span>
        </div>
        <div className="flex gap-3">
          <span className="p-3 bg-blue-500 rounded-sm"></span>
          <span className="p-3 bg-blue-500 rounded-sm"></span>
          <span className="p-3 bg-blue-500 rounded-sm"></span>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <input
          type="text"
          value={title}
          placeholder="Add a title"
          className="p-2 border-b-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="p-2"
          placeholder="Add a note here..."
        />

        <div className="absolute right-5 bottom-10">
          <Button
            text="Save Changes"
            variant="save"
            disabled={text.length === 0 || title.length === 0}
            handler={createHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateNote
