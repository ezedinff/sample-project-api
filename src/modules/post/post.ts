import BaseDocument from '../../shared/base-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
class Comment {
  userId: string;
  text: string;
}

export class CommentDTO extends Comment {}
export class PostDTO {
  userId: string;
  title: string;
  description: string;
}
@Schema({ timestamps: true })
export class Post extends BaseDocument {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: 0 })
  likes: number;
  @Prop({ default: [] })
  comments: Array<Comment>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
