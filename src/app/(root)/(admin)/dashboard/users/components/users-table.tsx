import { AuthUser } from '@/types/auth'
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
import { UserRowActions } from './user-row-actions'

interface Props {
  users: AuthUser[]
  loading: boolean
}

export function UsersTable({ users, loading }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex items-center justify-center py-20">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        )}

        {!loading &&
          users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isDeleted ? (
                  <span className="text-red-500">Deleted</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <UserRowActions user={user} />
              </TableCell>
            </TableRow>
          ))}

        {!loading && users.length === 0 && (
          <TableRow>
            <TableCell colSpan={4}>
              <EmptyState
                title="No users found"
                description="Try adjusting your search or filters."
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
