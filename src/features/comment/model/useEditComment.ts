import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { useState } from "react"

export const useEditComment = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const openEditDialog = (comment: TComment) => {
    setSelectedComment(comment)
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!selectedComment) return

    setIsLoading(true)
    try {
      const data = await commentApi.updateComment(selectedComment.id, {
        body: selectedComment.body,
      })
      setIsOpen(false)
      setSelectedComment(null)
      return data
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    setIsOpen,
    selectedComment,
    setSelectedComment,
    openEditDialog,
    handleSubmit,
    isLoading,
  }
}
