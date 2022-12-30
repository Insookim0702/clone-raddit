import { BaseEntity, Column, Index } from "typeorm";
import User from "./User";

export default class Sub extends BaseEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string;

  @Column()
  user: User;

  @Column()
  posts: Post[];
}
