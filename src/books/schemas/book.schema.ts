import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @ApiProperty({
    example: '672a1b2c3d4e5f6789012345',
    description: 'Identificador únic del llibre a MongoDB',
  })
  _id!: string;

  @ApiProperty({ example: 'La metamorfosi', description: 'Títol del llibre' })
  @Prop({ required: true, trim: true })
  title!: string;

  @ApiProperty({ example: 'Franz Kafka', description: 'Autor del llibre' })
  @Prop({ required: true, trim: true })
  author!: string;

  @ApiPropertyOptional({ example: 1915, description: 'Any de publicació' })
  @Prop({
    type: Number,
    min: [1000, "L'any ha de ser superior a 1000"],
    max: [new Date().getFullYear(), "L'any no pot ser futur"],
  })
  year?: number;

  @ApiPropertyOptional({
    example: '9788420674205',
    description: 'ISBN del llibre',
  })
  @Prop({
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^(?:\d{9}[\dXx]|\d{13})$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} no és un ISBN vàlid!`,
    },
  })
  isbn?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
