import { Post } from '@/types/post'

interface Props {
  post: Post
}

export function SinglePostContent({ post }: Props) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
