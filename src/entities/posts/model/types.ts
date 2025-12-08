export type TPost = {
  id: number
  title: string
  body: string
  userId: number
  reactions: {
    likes: number
    dislikes: number
  }
  author?: {
    id: number
    username: string
    image: string
  }
}
