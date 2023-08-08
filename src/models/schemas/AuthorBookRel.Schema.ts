import { Schema } from 'mongoose';
import { MODEL_ALIAS } from 'src/constants';
import { AuthorBookRelData } from 'src/types';

const AuthorBookRelSchema = new Schema<AuthorBookRelData>({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: MODEL_ALIAS.Book,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: MODEL_ALIAS.Author,
    required: true,
  },
});

AuthorBookRelSchema.index({ bookId: 1, authorId: 1 }, { unique: true });

export { AuthorBookRelSchema };
