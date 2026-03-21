'use client'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FileText, Pencil, Trash2 } from 'lucide-react'
import { PostEntity } from '@/types/post'
import { Loader } from '@/components/ui/loader'
import { EmptyState } from '@/components/common/empty-state'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  data: PostEntity[]
  loading: boolean
  onDeleteClick: (id: string) => void
  onEditClick: (post: PostEntity) => void
}

export default function PostTable({
  data,
  loading,
  onDeleteClick,
  onEditClick,
}: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader label="Loading posts..." />
      </div>
    )
  }

  if (!data.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No posts found"
        description="Try adjusting filters or create a new post."
      />
    )
  }

  return (
    <div className="bg-background overflow-x-auto rounded-xl border">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data &&
            data?.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted relative h-14 w-20 overflow-hidden rounded-md border">
                      {post?.coverImage ? (
                        <Image
                          src={post?.coverImage}
                          alt={post?.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="max-w-2xl">
                      <p className="truncate font-medium capitalize">
                        {post.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      post.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700',
                    )}
                  >
                    {post.status}
                  </Badge>
                </TableCell>

                <TableCell className="capitalize">{post.category}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onEditClick(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => onDeleteClick(post._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
