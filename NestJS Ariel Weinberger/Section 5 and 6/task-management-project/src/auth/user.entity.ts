/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from "src/tasks/dto/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password:string;

    @OneToMany(_type => Task, task => task.user, {eager: true})
    tasks: Task[];
}