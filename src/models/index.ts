import mongoose from 'mongoose';
import { MODEL_ALIAS } from '../constants';
import { BookSchema } from './schemas/Book.Schema';
import { GenreSchema } from './schemas/Genre.Schema';
import { GenreBookRelSchema } from './schemas/GenreBookRel.Schema';

export const BookModel = mongoose.model(MODEL_ALIAS.Book, BookSchema);
export const GenreModel = mongoose.model(MODEL_ALIAS.Genre, GenreSchema);
export const GenreBookRelModel = mongoose.model(
  MODEL_ALIAS.GenreBookRel,
  GenreBookRelSchema,
);

// GridFs for Image to manage image media
export let ImageGridFsBucket: mongoose.mongo.GridFSBucket;
mongoose.connection.on('connected', () => {
  ImageGridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: MODEL_ALIAS.Image,
  });
});
