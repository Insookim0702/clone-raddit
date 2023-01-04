import { Entity } from "typeorm";
import BaseEntity from "./Entity";

@Entity("comments")
export default class Comments extends BaseEntity {}
