import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema({ timestamps: true })
export class Goal {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  deadline: string; // ISO Date

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Goal', default: null })
  parentId: string | null;

  @Prop({ required: true })
  order: number;

  @Prop()
  publicId: string;

  @Prop({ required: true })
  ownerId: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
