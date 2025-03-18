/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private jwtService : JwtService,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.usersRepo.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}> {
        const {username, password} = authCredentialsDto
        const user = await this.usersRepo.findOne({where: {username}})

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = {username}
            const accessToken: string = await this.jwtService.sign(payload)
            return {accessToken}
        }
        else{
            throw new UnauthorizedException('Check your login credentials')
        }
    }
}                                                                                                                                                                                                                                                          
