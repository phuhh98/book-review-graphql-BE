import { UserData, ProfileData, UserDataAfterPopulated } from '../types';
import { Model, isValidObjectId } from 'mongoose';
import { createMongoObjectIdFromString } from '../utils';

export default class UserService {
  constructor(
    private userModel: Model<UserData>,
    private profileModel: Model<ProfileData>,
  ) {}

  async addOne(userData: {
    email: string;
    profile: Omit<ProfileData, 'createdAt' | 'updatedAt' | '_id'>;
  }): Promise<UserDataAfterPopulated | null> {
    const userProfile = new this.profileModel(userData.profile);
    await userProfile.save({ session: await this.getProfileTransactionSession() });

    const newUser = new this.userModel({
      email: userData.email,
      profile: userProfile._id,
    });

    try {
      await newUser.save({ session: await this.getUserModelTransactionSession() });
    } catch (err) {
      await this.profileModel.deleteOne({ _id: userProfile._id });
      throw err;
    }

    return (await newUser.populate('profile')) as unknown as UserDataAfterPopulated;
  }

  async getOneById(
    userId: UserData['_id'] | string,
  ): Promise<UserDataAfterPopulated | null> {
    this.checkUserIdValidOrThrowError(userId);
    const userRecord = await this.userModel.findById(userId);

    return userRecord ? userRecord.populate('profile') : null;
  }

  async getOneByEmail(email: UserData['email']): Promise<UserDataAfterPopulated | null> {
    const userRecord = await this.userModel.findOne({ email });

    return userRecord ? userRecord.populate('profile') : null;
  }

  async updateProfileById(
    userId: UserData['_id'] | string,
    profileData: Partial<UserDataAfterPopulated['profile']>,
  ): Promise<UserDataAfterPopulated | null> {
    this.checkUserIdValidOrThrowError(userId);

    const userRecord = await this.userModel.findById(userId);
    if (!userRecord) {
      throw new Error('User not found');
    }

    // If no profile attach => create a profile and attach to the user
    if (!userRecord.profile) {
      const userProfile = new this.profileModel(profileData);
      await userProfile.save({ session: await this.getProfileTransactionSession() });

      userRecord.profile = userProfile._id;
      await userRecord.save({ session: await this.getUserModelTransactionSession() });
      return userRecord.populate('profile');
    }

    // if profile exist, update it .
    await this.profileModel
      .findOneAndUpdate(
        { _id: createMongoObjectIdFromString(userRecord.profile.toString()) },
        { ...profileData },
        { runValidators: true },
      )
      .session(await this.getProfileTransactionSession());

    const updatedUserRecord = await this.userModel.findById(userId);

    return updatedUserRecord ? updatedUserRecord.populate('profile') : null;
  }

  private async getUserModelTransactionSession() {
    return await this.userModel.startSession();
  }

  private async getProfileTransactionSession() {
    return await this.profileModel.startSession();
  }

  private checkUserIdValidOrThrowError(userId: UserData['_id'] | string) {
    const userIdNotValid = !isValidObjectId(userId);
    if (userIdNotValid) {
      throw new Error(`GenreService: genreId is not valid.`);
    }
  }
}
