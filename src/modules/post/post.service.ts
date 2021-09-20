import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {
    super();
    this._model = postModel;
  }
}
