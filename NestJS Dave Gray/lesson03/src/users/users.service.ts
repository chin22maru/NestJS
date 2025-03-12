import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "ADMIN" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "INTERN" },
        { id: 3, name: "Michael Brown", email: "michael.brown@example.com", role: "INTERN" },
        { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "INTERN" },
        { id: 5, name: "Chris Wilson", email: "chris.wilson@example.com", role: "ADMIN" }
    ];
      
    findAll(role?: "INTERN" | "ADMIN"){
        if(role){
            return this.users.filter(user => user.role === role)
        }
        return this.users
    } 

    findOne(id: number){
        const user = this.users.find( user => user.id === id);
        return user;
    }

    create(user: {
        name: string,
        email: string,
        role: "INTERN" | "ADMIN"
    }) {
        const HighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: HighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: {
        name?: string,
        email?: string,
        role?: "INTERN" | "ADMIN"
    }) {
        this.users =  this.users.map(user => {
            if(user.id === id){
                return {...user, ...updatedUser}
            }
            return user;
        })
        return this.findOne(id)
    }

    delete(id: number){
        const deletedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return deletedUser
    }
}
