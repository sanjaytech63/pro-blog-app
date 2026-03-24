interface Props {
  content: string
}

export function BlogPostBody({ content }: Props) {
  return (
    <article
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
