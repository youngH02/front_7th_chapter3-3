import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { useState } from "react"

export const useEditPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const openEditDialog = (post: TPost) => {
    setSelectedPost(post)
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!selectedPost) return

    setIsLoading(true)
    try {
      const data = await postApi.updatePost(selectedPost.id, selectedPost)
      setIsOpen(false)
      setSelectedPost(null)
      return data
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    setIsOpen,
    selectedPost,
    setSelectedPost,
    openEditDialog,
    handleSubmit,
    isLoading,
  }
}
