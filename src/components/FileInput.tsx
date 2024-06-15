'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { TbCirclePlus, TbCircleX } from 'react-icons/tb'

interface FileInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'className'> {
  defaultMessage?: string
  label: string
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ defaultMessage = 'Add a file', label, ...props }: FileInputProps, ref) => {
    const [buttonMsg, setButtonMsg] = useState(defaultMessage)
    const [hasFile, setHasFile] = useState(false)

    const innerRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => innerRef.current!)

    const Icon = !hasFile ? TbCirclePlus : TbCircleX

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
        setButtonMsg(defaultMessage)
        setHasFile(false)
      } else {
        setButtonMsg(file.name)
        setHasFile(true)
      }
    }

    return (
      <div>
        <label className="block">
          {label}
          <input
            {...props}
            ref={innerRef}
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </label>

        <button
          className="input group flex items-center justify-between text-left"
          onClick={() => innerRef.current?.click()}
          type="button"
        >
          <span
            className={`${!hasFile ? 'text-stone-600 dark:text-stone-400 ' : ''}-mb-px mt-px`}
          >
            {buttonMsg}
          </span>
          <Icon
            aria-hidden
            className="h-6 w-6 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          />
        </button>
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'

export default FileInput
