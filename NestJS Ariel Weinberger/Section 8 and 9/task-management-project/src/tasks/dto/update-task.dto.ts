/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsEnum } from "class-validator";
import { TaskStatus } from "./task-status.enum";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus, {message: `hiii`})
    status: TaskStatus
}