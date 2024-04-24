type ContentContainerProps = React.ComponentPropsWithoutRef<'div'>

const ContentContainer = ({
  children,
  className,
  ...props
}: ContentContainerProps) => {
  return (
    <div
      id="content"
      {...props}
      className={`${className ? className + ' ' : ''}max-w-3xl mx-auto w-full space-y-8 text-lg`}
    >
      {children}
    </div>
  )
}

export default ContentContainer
