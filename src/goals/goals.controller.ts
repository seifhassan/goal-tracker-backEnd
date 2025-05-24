import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Goals')
@ApiBearerAuth()
@Controller()
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get('goals')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all goals for the authenticated user' })
  getUserGoals(@Request() req) {
    return this.goalsService.findAllByUser(req.user.userId);
  }

  @Post('goals')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new goal' })
  @ApiBody({ type: CreateGoalDto })
  createGoal(@Request() req, @Body() body: CreateGoalDto) {
    return this.goalsService.create({ ...body, ownerId: req.user.userId });
  }

  @Put('goals/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a goal' })
  @ApiParam({ name: 'id', description: 'Goal ID' })
  @ApiBody({ type: UpdateGoalDto })
  updateGoal(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateGoalDto
  ) {
    return this.goalsService.update(id, req.user.userId, body);
  }

  @Delete('goals/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a goal' })
  @ApiParam({ name: 'id', description: 'Goal ID' })
  deleteGoal(@Request() req, @Param('id') id: string) {
    return this.goalsService.delete(id, req.user.userId);
  }

  @Get('public-goals')
  @ApiOperation({ summary: 'List all public root-level goals' })
  listPublicGoals() {
    return this.goalsService.findAllPublic();
  }

  @Get('public-goals/:publicId')
  @ApiOperation({ summary: 'Get a public goal and its children by publicId' })
  @ApiParam({ name: 'publicId', description: 'Public share ID' })
  getPublicGoal(@Param('publicId') publicId: string) {
    return this.goalsService.findPublicById(publicId);
  }
}
