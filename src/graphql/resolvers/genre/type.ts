import { BookService } from '../../../services/';
import { GenreResolvers } from '../../../types';

// Genre type field resolvers
export const genreTypeResolver: GenreResolvers = {
  id: (parent) => parent._id.toString(),
  name: (parent) => parent.name,
  alias: (parent) => parent.alias,
  description: (parent) => parent.description,
  books: async (parent) => {
    if (!parent.books) {
      return [];
    }
    const books = await Promise.all(
      parent.books?.map(async (book) =>
        book === null ? null : await BookService.getOneById(book._id),
      ),
    );
    return books;
  },
  created_at: (parent) => parent.createdAt,
  updated_at: (parent) => parent.updatedAt,
};
