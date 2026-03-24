import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface Props {
  author: {
    fullName: string
    avatar: string
  }
}

export function BlogAuthor({ author }: Props) {
  return (
    <div className="mt-16 rounded-xl border p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={author.avatar} />
        </Avatar>

        <div>
          <p className="text-lg font-semibold">{author.fullName}</p>
        </div>
      </div>
    </div>
  )
}
