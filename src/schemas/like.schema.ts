import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {}

export const LikeSchema = SchemaFactory.createForClass<Like>;
