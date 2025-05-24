import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Goal, GoalDocument } from './schemas/goal.schema';

@Injectable()
export class GoalsService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}

  async create(goalData: Partial<Goal>): Promise<Goal> {
    if (goalData.parentId) {
      const parentGoal = await this.goalModel.findById(goalData.parentId);
      if (!parentGoal) throw new NotFoundException('Parent goal not found');

      if (parentGoal.parentId)
        throw new BadRequestException('Maximum depth (2 levels) exceeded');
    }

    const publicId = goalData.isPublic ? new Types.ObjectId().toString() : null;

    return this.goalModel.create({
      ...goalData,
      publicId,
    });
  }

  async findAllByUser(userId: string) {
    return this.goalModel.find({ ownerId: userId }).sort({ order: 1 }).exec();
  }

  async update(id: string, userId: string, updateData: Partial<Goal>) {
    const goal = await this.goalModel.findOne({ _id: id, ownerId: userId });
    if (!goal) throw new NotFoundException('Goal not found');
    if (updateData.parentId === id) {
      throw new BadRequestException('A goal cannot be its own parent');
    }
    if (updateData.parentId) {
      const hasChildren = await this.goalModel.exists({ parentId: id }); 
      if (hasChildren) {
        throw new BadRequestException(
          'A goal with children cannot become a child (would exceed max depth)',
        );
      }
      const parentGoal = await this.goalModel.findById(updateData.parentId);
      if (!parentGoal || parentGoal.parentId) {
        throw new BadRequestException(
          'Invalid parent - nesting too deep or not found',
        );
      }
    }

    return this.goalModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string, userId: string) {
    return this.goalModel.deleteOne({ _id: id, ownerId: userId });
  }

  async findAllPublic() {
    return this.goalModel
      .find({ isPublic: true, parentId: null })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findPublicById(publicId: string) {
    const goal = await this.goalModel.findOne({ publicId, isPublic: true });
    if (!goal) throw new NotFoundException('Public goal not found');

    const children = await this.goalModel.find({ parentId: goal._id }).exec();
    const subChildren = await this.goalModel
      .find({ parentId: { $in: children.map((c) => c._id) } })
      .exec();

    return {
      goal,
      children,
      subChildren,
    };
  }
}
