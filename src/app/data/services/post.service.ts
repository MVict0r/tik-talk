import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentCreateDto, CommentInterface, PostCreateDtoInterface, PostInterface} from "../interfaces/post.interface";
import {map, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  #http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<PostInterface[]>([])

  createPost(payload: PostCreateDtoInterface){
    return this.#http.post<PostInterface>(`${this.baseApiUrl}post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPost()
        })
      )
  }

  fetchPost(){
    return this.#http.get<PostInterface[]>(`${this.baseApiUrl}post/`)
      .pipe(
        tap(res => this.posts.set(res))
      )
  }

  createComment(payload: CommentCreateDto){
    return this.#http.post<CommentInterface>(`${this.baseApiUrl}comment/`, payload)
  }

  getCommentsByPostId(postId: number){
    return this.#http.get<PostInterface>(`${this.baseApiUrl}post/${postId}`)
      .pipe(
        map(res => res.comments)
      )
  }
}
