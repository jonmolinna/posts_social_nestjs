import { Document } from 'mongoose';

export interface userInterface extends Document {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly createdAt: Date;
}
