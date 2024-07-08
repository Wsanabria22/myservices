'use client'
import { CustomButtomProps } from "@/types"
import Image from "next/image"

const CustomButtom = ({title, containerStyles, handleClick, btnType, textStyles, rightIcon}: CustomButtomProps) => {
  return (
    <button
      disabled={false}
      type={btnType}
      className={`custom-btn border-solid border-blue-700 ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>
        {title}
      </span>
      {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          src={rightIcon}
          alt="right icon"
          fill
          className="object-contain"
        />
      </div>
    )}
    </button>    
  )
}

export default CustomButtom