import { Children, cloneElement, isValidElement } from 'react'

import styles from './Marquee.module.css'

interface MarqueeProps {
  children?: React.ReactNode
  className?: string
}

const Marquee = ({ children, className }: MarqueeProps) => {
  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child

      return cloneElement(child as React.ReactElement<any>, {
        tabIndex: -1,
      })
    })
  }

  return (
    <div className={`${styles.marquee}${className ? ' ' + className : ''}`}>
      <div className={styles.marqueeContent}>{children}</div>
      <div aria-hidden className={styles.marqueeContent}>
        {renderChildren()}
      </div>
    </div>
  )
}

export default Marquee
