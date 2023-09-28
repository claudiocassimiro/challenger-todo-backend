import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

enum Priority {
  ALTA = "alta",
  MEDIA = "média",
  BAIXA = "baixa",
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  creation_date: Date;

  @Column()
  completion_data: Date | null;

  @Column({
    type: "enum",
    enum: Priority,
    default: Priority.MEDIA,
  })
  priority: Priority;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
