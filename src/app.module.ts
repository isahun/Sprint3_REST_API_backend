import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Per gestionar variables d'entorn
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Fent que les variables d'entorn estiguin disponibles globalment
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/book-api',
    ),
    AuthModule,
    BooksModule, // Importa el mòdul de llibres
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
