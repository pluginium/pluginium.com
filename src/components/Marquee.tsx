'use client'

import { useEffect, useRef, useState } from 'react'

interface MarqueeProps {
  children?: React.ReactNode
  className?: string
}

const focusableEls = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
]

const focusableSelector = focusableEls
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(',')

const Marquee = ({ children, className }: MarqueeProps) => {
  const itemContainerRef = useRef<HTMLDivElement>(null)
  const duplicateItemsRef = useRef<HTMLDivElement>(null)

  const [isAnimating, setIsAnimating] = useState(true)

  const handleFocusIn = () => {
    const itemContainer = itemContainerRef.current

    if (!itemContainer || itemContainer.matches(':hover')) return

    setIsAnimating(false)
  }

  const handleFocusOut = () => {
    const itemContainer = itemContainerRef.current

    if (!itemContainer) return

    setIsAnimating(true)
  }

  useEffect(() => {
    const itemContainer = itemContainerRef.current
    const duplicateItems = duplicateItemsRef.current

    if (!itemContainer || !duplicateItems) return

    itemContainer.addEventListener('focusin', handleFocusIn)
    itemContainer.addEventListener('focusout', handleFocusOut)

    const focusableChildren = Array.from(
      duplicateItems.querySelectorAll(focusableSelector),
    )

    for (const child of focusableChildren) {
      child.setAttribute('tabindex', '-1')
    }

    return () => {
      itemContainer.removeEventListener('focusin', handleFocusIn)
      itemContainer.addEventListener('focusout', handleFocusOut)
    }
  }, [])

  return (
    <div
      ref={itemContainerRef}
      className={`marquee${className ? ' ' + className : ''}`}
    >
      <div className={`marqueeContent${isAnimating ? ' animation' : ''}`}>
        {children}
      </div>

      <div
        ref={duplicateItemsRef}
        aria-hidden
        className={`marqueeContent${isAnimating ? ' animation' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Marquee
