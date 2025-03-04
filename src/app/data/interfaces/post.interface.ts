import {ProfileInterface} from "./profile.interface";

export interface PostCreateDtoInterface {
  title: string
  content: string
  authorId: number
}

export interface PostInterface {
  id: number
  title: string
  content: string
  author: ProfileInterface,
  images: string[]
  createdAt: string
  updatedAt: string
  comments: CommentInterface[]
}

export interface CommentInterface {
  id: number
  text: string
  author: {
    id: number
    username: string
    avatarUrl: string
    subscribersAmount: number
  }
  postId: number
  commentId: number
  createdAt: string
  updatedAt: string
}

export interface CommentCreateDto {
  text: string
  authorId: number
  postId: number
}
