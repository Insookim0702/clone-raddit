import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Comments from "./Comment";

import BaseEntity from "./Entity";
import Post from "./Post";
import User from "./User";

@Entity("vote")
export default class Vote extends BaseEntity {
  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  username: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Comments)
  post: Post;

  @ManyToOne(() => Comments)
  comment: Comment;

  @Column({ nullable: true })
  commentId: number;
}
