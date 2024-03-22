import { TNote } from "../types"

function Notelist<T extends TNote>({
  note,
  toggleShow,
}: {
  note: T
  toggleShow: (value: T) => void
}) {
  return (
    <div
      key={note.id}
      className="border-b flex flex-col p-2 cursor-pointer"
      onClick={() => toggleShow(note)}
    >
      <p className="font-semibold">{note.title}</p>
      <p className="w-full line-clamp-1 overflow-hidden">{note.text}</p>
    </div>
  )
}

export default Notelist
