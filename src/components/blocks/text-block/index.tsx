import { BlockData } from '..'

type TextBlockProps = {
  data: BlockData
  className?: string
}

export default function TextBlock({ data, className }: TextBlockProps) {
  console.log(data)
  const { htmlContent } = data
  if (!htmlContent) return null
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
