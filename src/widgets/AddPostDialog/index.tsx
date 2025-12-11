import { type FC, useState } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { useDialogStore } from "@/shared/store/dialogStore"
import { postApi } from "@/entities/posts/api/postApi"

const AddPostDialog: FC = () => {
  const { showAddDialog, openAddDialog, closeAddDialog } = useDialogStore()
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const handleSubmit = async () => {
    await postApi.createPost({
      ...newPost,
      reactions: { likes: 0, dislikes: 0 },
    })
    closeAddDialog()
    setNewPost({ title: "", body: "", userId: 1 })
  }

  return (
    <>
      <Button onClick={openAddDialog}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
      <Dialog open={showAddDialog} onOpenChange={(open) => !open && closeAddDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={10}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Button onClick={handleSubmit}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPostDialog
