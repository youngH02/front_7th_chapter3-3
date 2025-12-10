import { commentApi } from "@/entities/comments/api/commentApi"
import { useState } from "react"

export const useAddComment = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [newComment, setNewComment] = useState({ body: "", postId: 0, userId: 1 })
  const [isLoading, setIsLoading] = useState(false)

  const openAddDialog = (postId: number) => {
    setNewComment((prev) => ({ ...prev, postId }))
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!newComment.postId) return

    setIsLoading(true)
    try {
      const data = await commentApi.createComment(newComment)
      setIsOpen(false)
      setNewComment({ body: "", postId: 0, userId: 1 })
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    setIsOpen,
    newComment,
    setNewComment,
    openAddDialog,
    handleSubmit,
    isLoading,
  }
}
