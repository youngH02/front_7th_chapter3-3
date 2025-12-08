import { TPost } from "@/entities/posts/model/types"
import { TableCell } from "@/shared/ui/Table"

export const PostListItem = ({ post }: { post: TPost }) => (
  <>
    <TableCell>{post.title}</TableCell>
    <TableCell>{post.author?.username}</TableCell>
    <TableCell>{post.reactions.likes}</TableCell>
  </>
)
