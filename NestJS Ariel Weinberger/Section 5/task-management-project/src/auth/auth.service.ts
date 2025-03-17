import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepo: UsersRepository){}

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.usersRepo.createUser(authCredentialsDto)
    }
}
