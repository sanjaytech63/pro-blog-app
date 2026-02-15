import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState } from '@/components/common/empty-state'
import { Loader } from 'lucide-react'
import { NewsletterSubscriber } from '@/types/newsletter.types'
import { MailX, Trash2 } from 'lucide-react'

interface Props {
  data: NewsletterSubscriber[]
  loading: boolean
  onDelete: (id: string) => void
  onUnsubscribe: (email: string) => void
}

export function NewsletterTable({
  data,
  loading,
  onDelete,
  onUnsubscribe,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex justify-center py-20">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        )}

        {!loading &&
          data.map((subscriber) => (
            <TableRow key={subscriber._id}>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                {subscriber.status === 'active' ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-500">Unsubscribed</span>
                )}
              </TableCell>
              <TableCell>
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-3 text-right">
                <button onClick={() => onUnsubscribe(subscriber.email)}>
                  <MailX size={16} />
                </button>

                <button onClick={() => onDelete(subscriber._id)}>
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}

        {!loading && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={4}>
              <EmptyState
                title="No subscribers found"
                description="Try adjusting your search criteria."
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
