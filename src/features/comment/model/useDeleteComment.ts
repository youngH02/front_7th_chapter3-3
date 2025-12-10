import { commentApi } from "@/entities/comments/api/commentApi"
import { useState } from "react"

export const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return false

    setIsLoading(true)
    try {
      await commentApi.deleteComment(id)
      return true
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleDelete,
    isLoading,
  }
}
