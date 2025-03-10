import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

@Controller("users") // this decorator handles /users routes
export class UsersController {
    // Dynamic Routes and Query Parametes

    // get /users
    // get /users/:id 
    // post /users 
    // patch /users/:id 
    // delete /users/:id

    // /users?role=value

    @Get()
    findAll(@Query('role') role: 'INTERN' | 'ADMIN') {
        return {role}
    }

    @Get(':id')
    findOne(@Param('id') userid: string) {
        return {userid}
    }

    @Post()
    create(@Body() newUser: object){
        return newUser
    }

    @Patch(':id')
    update(@Param('id') userId: string , @Body() updatedUser: object){
        return {id: userId, ...updatedUser}
    }

    @Delete(':id')
    delete(@Param('id') userId: string){
        return {userId}
    }
}
