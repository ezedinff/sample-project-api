import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDTO, PostDTO } from './post';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getPosts() {
    return await this.postService.findAll({});
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPosts(@Req() req, @Body() post: PostDTO) {
    return await this.postService.create({ ...post, userId: req.user._id });
  }
  @Post(':id/comments')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Req() req,
    @Param('id') id: string,
    @Body() comment: CommentDTO,
  ) {
    const post = await this.postService.findById(id);
    post.comments.push({ ...comment, userId: req.user._id });
    return await this.postService.update(id, post);
  }
}
