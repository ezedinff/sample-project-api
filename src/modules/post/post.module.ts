import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService],
})
export class PostModule {}
