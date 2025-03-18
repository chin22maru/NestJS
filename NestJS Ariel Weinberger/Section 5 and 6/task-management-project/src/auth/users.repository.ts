/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager()); // ✅ Correct way to extend Repository
    } 

    async createUser(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        const {username,password} = authCredentialsDto

        //hash
        const salt = await bcrypt.genSalt()
        console.log(salt)
        const hashedPass = await bcrypt.hash(password, salt)
        console.log(hashedPass)

        const user = this.create({username, password: hashedPass})

        try{
            await this.save(user)
        }
        catch(e){
            if(e.code === "23505"){
                throw new ConflictException('Username already exists')
            }
            else{
                throw new InternalServerErrorException()
            }
        }
    }
}