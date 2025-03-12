import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ParseIntPipe, ValidationPipe } from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users") // this decorator handles /users routes
export class UsersController {
    // Dynamic Routes and Query Parametes

    // get /users
    // get /users/:id 
    // post /users 
    // patch /users/:id 
    // delete /users/:id

    // /users?role=value

    constructor(private readonly usersSerivice: UsersService){}

    @Get()
    findAll(@Query('role') role: 'INTERN' | 'ADMIN') {
        return this.usersSerivice.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) userId: number) {
        return this.usersSerivice.findOne(userId)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){  // neweUser
        return this.usersSerivice.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) userId: number , @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersSerivice.update(userId, updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) userId: number){
        return this.usersSerivice.delete(userId)
    }
}
