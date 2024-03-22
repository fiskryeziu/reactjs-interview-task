import clsx from "clsx"
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa6"

type TButton = {
  variant: "delete" | "save" | "create"
  text: string
  handler?: () => void
  disabled?: boolean
}
const Button = ({ variant, text, handler, disabled }: TButton) => {
  return (
    <button
      className={clsx(
        "rounded-sm text-white flex  justify-center w-full items-center divide-x",
        variant === "delete" && "bg-[#FE4C4A] divide-[#f5605eb2]",
        (variant === "save" || variant === "create") &&
          "bg-[#68C142] divide-[#60b13d]",
        disabled && "cursor-not-allowed"
      )}
      onClick={handler}
      disabled={disabled}
      name="testing"
    >
      <span className=" border-gray-300 px-2 text-sm w-[80%]">{text}</span>

      <div className="flex items-center p-1 w-[20%] justify-center">
        {variant === "create" && <FaPlus className="text-xl" />}
        {variant === "save" && <FaCheck className="text-xl" />}
        {variant === "delete" && <FaTrash fill="white" />}
      </div>
    </button>
  )
}

export default Button
