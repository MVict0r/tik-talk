import {Component, inject, input, OnInit, signal} from '@angular/core';
import {CommentInterface, PostInterface} from "../../../data/interfaces/post.interface";
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {DatePipe} from "@angular/common";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostInputComponent} from "../post-input/post-input.component";
import {CommentComponent} from "./comment/comment.component";
import {PostService} from "../../../data/services/post.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<PostInterface>()

  comments = signal<CommentInterface[]>([])

  postService = inject(PostService)

  ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated(){
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    )
    this.comments.set(comments)
  }
}
