import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { useEffect, useState } from "react"

export const useCommentList = (postId: number) => {
  const [comments, setComments] = useState<TComment[]>([])
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    if (!postId) return

    setLoading(true)
    try {
      const data = await commentApi.getCommentsByPostId(postId)
      setComments(data.comments)
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  return { comments, loading, refetch: fetchComments }
}
