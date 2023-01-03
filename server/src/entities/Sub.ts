import { Expose } from "class-transformer";
import {
  BaseEntity,
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Post from "./Post";
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

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : "https://www.gravator.com/avatar?d=mp&f=y";
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/${this.bannerUrl}`
      : "";
  }
}
