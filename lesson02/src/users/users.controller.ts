import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

import { UsersService } from "./users.service";

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
    findOne(@Param('id') userId: string) {
        return this.usersSerivice.findOne(+userId)
    }

    @Post()
    create(@Body() newUser: {
        name: string,
        email: string,
        role: "INTERN" | "ADMIN"
    }){
        return this.usersSerivice.create(newUser)
    }

    @Patch(':id')
    update(@Param('id') userId: string , @Body() updatedUser: {
        name?: string,
        email?: string,
        role?: "INTERN" | "ADMIN"
    }){
        return this.usersSerivice.update(+userId, updatedUser)
    }

    @Delete(':id')
    delete(@Param('id') userId: string){
        return this.usersSerivice.delete(+userId)
    }
}
