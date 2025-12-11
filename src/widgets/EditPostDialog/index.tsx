import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { useDialogStore } from "@/shared/store/dialogStore"
import { postApi } from "@/entities/posts/api/postApi"
import { usePostList } from "@/entities/posts/model/usePostList"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"

const EditPostDialog: FC = () => {
  const { showEditDialog, editingPost, closeEditDialog, setEditingPost } = useDialogStore()
  const { selectedTag, limit, skip } = useSearchFilter()
  const { refetch } = usePostList(limit, skip, selectedTag)

  const handleUpdatePost = async () => {
    if (editingPost) {
      await postApi.updatePost(editingPost.id, editingPost)
      closeEditDialog()
      refetch()
    }
  }

  if (!editingPost) return null

  return (
    <Dialog open={showEditDialog} onOpenChange={closeEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editingPost.title || ""}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <Textarea
            rows={10}
            placeholder="내용"
            value={editingPost.body || ""}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
