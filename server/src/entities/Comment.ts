import { Exclude, Expose } from "class-transformer";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { makeId } from "../utils/helper";

import BaseEntity from "./Entity";
import Post from "./Post";
import User from "./User";
import Vote from "./Vote";

@Entity("comments")
export default class Comments extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column({ nullable: true })
  commentId: number;

  @Column({ nullable: true })
  body: string;

  @Column()
  username: string;

  @Column()
  postId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number {
    const initialVote = 0;
    return this.votes?.reduce(
      (previousValue, cur) => previousValue + (cur.value || 0),
      initialVote
    );
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
