import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,  // at max a client make 3 req in 1 sec
      limit: 3,
    }, {
      name: 'long',
      ttl: 60000,  // at max a client make 100 req in 1 min
      limit: 100,
    }]),
    MyLoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass : ThrottlerGuard,
  }],
})
export class AppModule {}
