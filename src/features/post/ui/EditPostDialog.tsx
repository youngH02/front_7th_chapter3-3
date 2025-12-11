import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { useEditPost } from "@/features/post/model/useEditPost"

const EditPostDialog: FC = () => {
  const { isOpen, setIsOpen, selectedPost, setSelectedPost, handleSubmit, isLoading } = useEditPost()

  if (!selectedPost) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "수정 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
