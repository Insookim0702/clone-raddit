import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcryptjs";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
} from "typeorm";
@Entity("users")
export default class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: "이메일 주가 잘못되었습니다." })
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습니다." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3자 이상이어야 합니다" })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다" })
  password: string;

  @OneToMany(() => post, (port) => postMessage.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}