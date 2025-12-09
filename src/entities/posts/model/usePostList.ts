import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { useEffect, useState } from "react"

export const usePostList = (limit: number, skip: number, tag?: string) => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      // 태그가 있으면 태그별, 없으면 전체
      const data = tag && tag !== "all" ? await postApi.getPostsByTag(tag) : await postApi.getPosts(limit, skip)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      const errorMessage = tag ? "태그별 게시물 가져오기 오류:" : "게시물 가져오기 오류:"
      console.error(errorMessage, error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [limit, skip, tag])

  return { posts, total, loading, refetch: fetchPosts }
}
