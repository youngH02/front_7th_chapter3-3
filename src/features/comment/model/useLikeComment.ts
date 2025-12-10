import { commentApi } from "@/entities/comments/api/commentApi"
import { useState } from "react"

export const useLikeComment = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async (id: number, currentLikes: number) => {
    setIsLoading(true)
    try {
      const data = await commentApi.likeComment(id, currentLikes)
      return data
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLike,
    isLoading,
  }
}
