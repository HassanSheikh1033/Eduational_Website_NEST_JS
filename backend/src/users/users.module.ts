import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    //The forFeature method is used to define Mongoose schemas for the module.
  ],
  controllers: [UsersController],
  providers: [UsersService]
})


export class UsersModule {}


