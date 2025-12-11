import { Plus } from "lucide-react"
import { Button } from "@/shared/ui"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Button, Input } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import PostsTable from "@/widgets/PostsTable"
import SearchFilter from "@/widgets/SearchFilter"
import Pagination from "@/widgets/Pagination"
import CommentsSection from "@/widgets/CommentsSection"
import AddPostDialog from "@/widgets/AddPostDialog"
import { usePostList } from "@/entities/posts/model/usePostList"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"
import { highlightText } from "@/shared/lib/highlightText"
import { TPost } from "@/entities/posts/model/types"
import { postApi } from "@/entities/posts/api/postApi"

const PostsManager = () => {
  const { selectedTag, limit, skip, searchQuery } = useSearchFilter()
  const { posts, total, loading, refetch } = usePostList(limit, skip, selectedTag)

  // 게시물 상세 모달 상태
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 게시물 수정 모달 상태
  const [editingPost, setEditingPost] = useState<TPost | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  // 핸들러
  const handleOpenDetail = (post: TPost) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  const handleOpenEdit = (post: TPost) => {
    setEditingPost(post)
    setShowEditDialog(true)
  }

  const handleDelete = async (postId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await postApi.deletePost(postId)
      refetch()
    }
  }

  const handleUpdatePost = async () => {
    if (editingPost) {
      await postApi.updatePost(editingPost.id, editingPost)
      setShowEditDialog(false)
      refetch()
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <SearchFilter />
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              onOpenDetail={handleOpenDetail}
              onOpenEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}
          <Pagination total={total} />
        </div>
      </CardContent>

      {/* 게시물 상세 다이얼로그 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {selectedPost && <CommentsSection postId={selectedPost.id} />}
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 다이얼로그 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={editingPost?.title || ""}
              onChange={(e) => setEditingPost(editingPost ? { ...editingPost, title: e.target.value } : null)}
            />
            <Textarea
              rows={10}
              placeholder="내용"
              value={editingPost?.body || ""}
              onChange={(e) => setEditingPost(editingPost ? { ...editingPost, body: e.target.value } : null)}
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
