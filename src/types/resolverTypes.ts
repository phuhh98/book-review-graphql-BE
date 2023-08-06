import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { BookData, GenreData } from './models';
import { GraphqlContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Represent binary which used for file data */
  Binary: { input: any; output: any };
  /** Date type */
  Date: { input: any; output: any };
};

export type Author = {
  __typename?: 'Author';
  bio?: Maybe<Scalars['String']['output']>;
  books: Array<Maybe<Book>>;
  created_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updated_at: Scalars['Date']['output'];
  user?: Maybe<User>;
};

export type Book = {
  __typename?: 'Book';
  cover_image?: Maybe<Scalars['Binary']['output']>;
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  id: Scalars['ID']['output'];
  publish_date?: Maybe<Scalars['Date']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  alias?: Maybe<Scalars['String']['output']>;
  books?: Maybe<Array<Maybe<Book>>>;
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookToGenre: Genre;
  addGenreToBook: Book;
  createBook: Book;
  createGenre: Genre;
  removeBookFromGenre: Genre;
};

export type MutationAddBookToGenreArgs = {
  bookId: Scalars['ID']['input'];
  genreId: Scalars['ID']['input'];
};

export type MutationAddGenreToBookArgs = {
  bookId: Scalars['ID']['input'];
  genreId: Scalars['ID']['input'];
};

export type MutationCreateBookArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  publish_date?: InputMaybe<Scalars['Date']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateGenreArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MutationRemoveBookFromGenreArgs = {
  bookId: Scalars['ID']['input'];
  genreId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Get a book's detail by its id */
  bookById: Book;
  /** Get a list of books by search with its title */
  booksByTitle: Array<Maybe<Book>>;
  /** Get a genre's details by its id */
  genreById: Genre;
  /** Get a list of genres by search with its name */
  genresByName: Array<Maybe<Genre>>;
};

export type QueryBookByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryBooksByTitleArgs = {
  title: Scalars['String']['input'];
};

export type QueryGenreByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGenresByNameArgs = {
  name: Scalars['String']['input'];
};

/** User data representation */
export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['Binary']['output']>;
  created_at: Scalars['Date']['output'];
  date_of_birth?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  read_books: Array<Maybe<Book>>;
  updated_at: Scalars['Date']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Author: ResolverTypeWrapper<
    Omit<Author, 'books' | 'user'> & {
      books: Array<Maybe<ResolversTypes['Book']>>;
      user?: Maybe<ResolversTypes['User']>;
    }
  >;
  Binary: ResolverTypeWrapper<Scalars['Binary']['output']>;
  Book: ResolverTypeWrapper<BookData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<GenreData>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'read_books'> & { read_books: Array<Maybe<ResolversTypes['Book']>> }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Author: Omit<Author, 'books' | 'user'> & {
    books: Array<Maybe<ResolversParentTypes['Book']>>;
    user?: Maybe<ResolversParentTypes['User']>;
  };
  Binary: Scalars['Binary']['output'];
  Book: BookData;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Genre: GenreData;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: Omit<User, 'read_books'> & { read_books: Array<Maybe<ResolversParentTypes['Book']>> };
}>;

export type AuthorResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author'],
> = ResolversObject<{
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  books?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BinaryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Binary'], any> {
  name: 'Binary';
}

export type BookResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book'],
> = ResolversObject<{
  cover_image?: Resolver<Maybe<ResolversTypes['Binary']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['Genre']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publish_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenreResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre'],
> = ResolversObject<{
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  addBookToGenre?: Resolver<
    ResolversTypes['Genre'],
    ParentType,
    ContextType,
    RequireFields<MutationAddBookToGenreArgs, 'bookId' | 'genreId'>
  >;
  addGenreToBook?: Resolver<
    ResolversTypes['Book'],
    ParentType,
    ContextType,
    RequireFields<MutationAddGenreToBookArgs, 'bookId' | 'genreId'>
  >;
  createBook?: Resolver<
    ResolversTypes['Book'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBookArgs, 'title'>
  >;
  createGenre?: Resolver<
    ResolversTypes['Genre'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGenreArgs, 'name'>
  >;
  removeBookFromGenre?: Resolver<
    ResolversTypes['Genre'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveBookFromGenreArgs, 'bookId' | 'genreId'>
  >;
}>;

export type QueryResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  bookById?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<QueryBookByIdArgs, 'id'>>;
  booksByTitle?: Resolver<
    Array<Maybe<ResolversTypes['Book']>>,
    ParentType,
    ContextType,
    RequireFields<QueryBooksByTitleArgs, 'title'>
  >;
  genreById?: Resolver<ResolversTypes['Genre'], ParentType, ContextType, RequireFields<QueryGenreByIdArgs, 'id'>>;
  genresByName?: Resolver<
    Array<Maybe<ResolversTypes['Genre']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGenresByNameArgs, 'name'>
  >;
}>;

export type UserResolvers<
  ContextType = GraphqlContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['Binary']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  date_of_birth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  full_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read_books?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphqlContext> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  Binary?: GraphQLScalarType;
  Book?: BookResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Genre?: GenreResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
