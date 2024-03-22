import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { TCategory, TNote } from "../types"
import clsx from "clsx"
import Notelist from "./Notelist"
import NoteInfo from "./NoteInfo"
import Button from "./Button"
import CreateNote from "./CreateNote"
import { getCategoryById } from "../api/api"

function Notes() {
  const [notes, setNotes] = useState<TNote[]>([])
  const [selectedNote, setSelectedNote] = useState<TNote | null>(null)
  const [toggleNote, setToggleNote] = useState(false)
  const [search, setSearch] = useState("")
  const { categoryId } = useParams()

  const getNotes = async () => {
    if (categoryId) {
      const data: TCategory = await getCategoryById(categoryId)

      if (data) {
        setNotes(data.notes)
      }
    }
  }

  useEffect(() => {
    if (categoryId) {
      getNotes()
      setSelectedNote(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  const toggleShow = (note: TNote) => {
    setSelectedNote(selectedNote === note ? null : note)
  }

  const toggleCreate = () => {
    setToggleNote(true)
  }

  const filteredData = notes.filter((note) => {
    if (search === "") {
      return notes
    } else {
      return note.title.toLowerCase().includes(search.toLowerCase())
    }
  })

  return (
    <div className="flex flex-col w-full bg-white m-2 rounded-md">
      {toggleNote ? (
        <CreateNote setNotes={setNotes} toggle={setToggleNote} />
      ) : (
        <>
          <div className="flex h-full bg-gray-200 gap-2">
            <div
              className={clsx(
                "flex flex-col overflow-scroll bg-white rounded-md ",
                selectedNote ? "w-1/2" : "w-full"
              )}
            >
              <div className="flex gap-2 items-center m-2">
                <div className="w-48 text-center">
                  <Button
                    variant="create"
                    text="Create Note"
                    handler={toggleCreate}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="border px-2 bg-gray-100"
                  />
                </div>
              </div>
              {filteredData.length > 0 &&
                filteredData.map((note) => (
                  <Notelist key={note.id} note={note} toggleShow={toggleShow} />
                ))}
            </div>
            {selectedNote && (
              <NoteInfo
                note={selectedNote}
                setSelectedNote={setSelectedNote}
                setNotes={setNotes}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Notes
