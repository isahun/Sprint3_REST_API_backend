import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // Per gestionar variables d'entorn
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Fent que les variables d'entorn estiguin disponibles globalment
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/book-api',
    ),

    BooksModule, // Importa el mòdul de llibres
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
