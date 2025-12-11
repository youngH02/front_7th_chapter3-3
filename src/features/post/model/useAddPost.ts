import { postApi } from "@/entities/posts/api/postApi"
import { useState } from "react"

export const useAddPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const handleSubmit = async () => {
    await postApi.createPost({
      ...newPost,
      reactions: { likes: 0, dislikes: 0 },
    })
    setIsOpen(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  return {
    isOpen,
    setIsOpen,
    newPost,
    setNewPost,
    handleSubmit,
  }
}
