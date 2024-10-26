import { Module, MiddlewareConsumer } from '@nestjs/common'; // Import MiddlewareConsumer
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Optional, for managing environment variables
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ProjectsModule } from './projects/projects.module';
import { FileuploadsModule } from './fileuploads/fileuploads.module';
import * as cors from 'cors'; // Import cors package

@Module({
  imports: [
    ConfigModule.forRoot(), // Optional
    MongooseModule.forRoot('mongodb+srv://Hassan:Hassan@cluster0.lwfhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Connect to MongoDB
    // MongooseModule.forRoot(process.env.MONGODB_URI), // Connect to MongoDB
    UsersModule,
    CoursesModule,
    ProjectsModule,
    FileuploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors()) // Apply the CORS middleware
      .forRoutes('*'); // Enable for all routes
  }
}
