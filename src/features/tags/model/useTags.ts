import { postApi } from "@/entities/posts/api/postApi"
import { useEffect, useState } from "react"

export type TTag = {
  slug: string
  name: string
  url: string
}

export const useTags = () => {
  const [tags, setTags] = useState<TTag[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTags = async () => {
    setLoading(true)
    try {
      const data = await postApi.getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return { tags, loading }
}
