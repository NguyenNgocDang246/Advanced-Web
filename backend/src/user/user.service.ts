import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('Email already exists');

    const hashed = await bcryptjs.hash(password, 10);
    const user = await this.userModel.create({ email, password: hashed });
    return { id: user._id, email: user.email, createdAt: user.createdAt };
  }

  async login(body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return { id: user._id, email: user.email, createdAt: user.createdAt };
  }
}
