import { postApi } from "@/entities/posts/api/postApi"
import { useState } from "react"

export const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return false

    setIsLoading(true)
    try {
      await postApi.deletePost(id)
      return true
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
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
