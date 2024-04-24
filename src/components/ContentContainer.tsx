interface ContentContainerProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> {
  unstyled?: boolean
}

const ContentContainer = ({
  children,
  className,
  unstyled,
  ...props
}: ContentContainerProps) => {
  return (
    <div
      {...props}
      id={!unstyled ? 'content' : undefined}
      className={`${className ? className + ' ' : ''}max-w-3xl mx-auto w-full space-y-8 text-lg`}
    >
      {children}
    </div>
  )
}

export default ContentContainer
