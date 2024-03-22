import { useParams } from "react-router-dom"
import { TCategory, TNote } from "../types"
import { useState } from "react"
import Button from "./Button"
import { getCategoryById, updateCategoriesbyId } from "../api/api"

export default function NoteInfo({
  note,
  setNotes,
  setSelectedNote,
}: {
  note: TNote
  setNotes: (v: TNote[]) => void
  setSelectedNote: (v: TNote | null) => void
}) {
  const [title, setTitle] = useState(note.title ?? "")
  const [text, setText] = useState(note.text ?? "")

  const { categoryId } = useParams()

  const changeNoteHandler = async () => {
    if (categoryId) {
      const category: TCategory = await getCategoryById(categoryId)

      const noteIndex = category.notes.findIndex((n) => n.id === note.id)
      const updatedNote = { ...category.notes[noteIndex], title, text }

      const updatedNotes = [
        ...category.notes.slice(0, noteIndex),
        updatedNote,
        ...category.notes.slice(noteIndex + 1),
      ]
      const updatedCategory = { ...category, notes: updatedNotes }

      const response = await updateCategoriesbyId(categoryId, updatedCategory)
      if (response.ok) {
        setSelectedNote(null)
        setNotes(updatedNotes)
      } else {
        console.error("Failed to update note inputs")
      }
    }
  }
  const deleteNoteHandler = async () => {
    if (categoryId) {
      const category: TCategory = await getCategoryById(categoryId)

      const newNotes = category.notes.filter((item) => item.id !== note.id)

      const updatedCategory = { ...category, notes: newNotes }
      const response = await updateCategoriesbyId(categoryId, updatedCategory)
      if (response.ok) {
        setSelectedNote(null)
        setNotes(newNotes)
      } else {
        console.error("Failed to delete note")
      }
    }
  }

  return (
    <div className="w-1/2 bg-white rounded-md relative">
      <div className="flex justify-between m-2 relative">
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
          className="px-2 border-b-2 font-semibold"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="p-2 text-base"
          placeholder="Add a note here..."
          rows={12}
        />

        <div className="absolute right-5 bottom-10">
          <Button
            text="Save Changes"
            variant="save"
            disabled={text.length === 0 || title.length === 0}
            handler={changeNoteHandler}
          />
        </div>
        <div className="absolute left-5 bottom-10">
          <Button
            text="Delete Note"
            variant="delete"
            disabled={text.length === 0 || title.length === 0}
            handler={deleteNoteHandler}
          />
        </div>
      </div>
    </div>
  )
}
