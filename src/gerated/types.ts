import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
  /** Can be used as an argument to upload files using https://github.com/jaydenseric/graphql-multipart-request-spec */
  Upload: any;
};

export type Categories = {
  __typename?: 'Categories';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  show_in_home: Scalars['Boolean'];
};

/** A paginated list of Categories items. */
export type CategoriesPaginator = {
  __typename?: 'CategoriesPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Categories items. */
  data: Array<Categories>;
};

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateProductFileInput = {
  principal?: Maybe<Scalars['Boolean']>;
  product_id?: Maybe<Scalars['ID']>;
  file_name?: Maybe<Scalars['String']>;
  file_url?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
};

export type CreateProductInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['Int']>;
  currency?: Maybe<Currency>;
  category_id?: Maybe<Scalars['ID']>;
};

export type CreateProductVisitInput = {
  country_code?: Maybe<Scalars['String']>;
  country_name?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  IPv4?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  product_id: Scalars['ID'];
};

export type CreateSettingInput = {
  shipping_cost?: Maybe<Scalars['Float']>;
  IVA?: Maybe<Scalars['Float']>;
};

export type CreateSubscriptionInput = {
  email: Scalars['String'];
};

export type CreateUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export enum Currency {
  Usd = 'USD',
  Eur = 'EUR'
}



export type HomeProduct = {
  __typename?: 'HomeProduct';
  product: Maybe<Products>;
  product_files: Maybe<ProductFiles>;
};

export type HomeResponse = {
  __typename?: 'HomeResponse';
  rings: Maybe<HomeProduct>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createUser: Maybe<User>;
  updateUser: Maybe<User>;
  createProduct: Maybe<Products>;
  updateProduct: Maybe<Products>;
  deleteProduct: Maybe<Products>;
  createCategory: Maybe<Categories>;
  deleteCategory: Maybe<Categories>;
  updateCategory: Maybe<Categories>;
  createProductFile: Maybe<ProductFiles>;
  updateProductFile: Maybe<ProductFiles>;
  deleteProductFile: Maybe<ProductFiles>;
  createSubscription: Maybe<Subscriptions>;
  createProductVisit: Maybe<ProductVisits>;
  createSetting: Maybe<Settings>;
  updateSetting: Maybe<Settings>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationCreateProductFileArgs = {
  input: CreateProductFileInput;
};


export type MutationUpdateProductFileArgs = {
  input: UpdateProductFileInput;
};


export type MutationDeleteProductFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationCreateProductVisitArgs = {
  input: CreateProductVisitInput;
};


export type MutationCreateSettingArgs = {
  input: CreateSettingInput;
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor to continue paginating backwards. */
  startCursor: Maybe<Scalars['String']>;
  /** The cursor to continue paginating forwards. */
  endCursor: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type ProductFileResponse = {
  __typename?: 'ProductFileResponse';
  success: Maybe<Scalars['Boolean']>;
  message: Maybe<Scalars['String']>;
};

export type ProductFiles = {
  __typename?: 'ProductFiles';
  id: Scalars['ID'];
  principal: Maybe<Scalars['Boolean']>;
  product: Maybe<Products>;
  file_name: Maybe<Scalars['String']>;
  file_url: Maybe<Scalars['String']>;
  original_name: Maybe<Scalars['String']>;
  file: Maybe<Scalars['Upload']>;
  slug: Maybe<Scalars['String']>;
};

/** A paginated list of ProductFiles items. */
export type ProductFilesPaginator = {
  __typename?: 'ProductFilesPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of ProductFiles items. */
  data: Array<ProductFiles>;
};

export type ProductVisitByDate = {
  __typename?: 'ProductVisitByDate';
  data: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type ProductVisits = {
  __typename?: 'ProductVisits';
  id: Scalars['ID'];
  country_code: Maybe<Scalars['String']>;
  country_name: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  IPv4: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  product: Maybe<Products>;
};

/** A paginated list of ProductVisits items. */
export type ProductVisitsPaginator = {
  __typename?: 'ProductVisitsPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of ProductVisits items. */
  data: Array<ProductVisits>;
};

export type Products = {
  __typename?: 'Products';
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['DateTime']>;
  updated_at: Maybe<Scalars['DateTime']>;
  price: Maybe<Scalars['Int']>;
  stock: Maybe<Scalars['Int']>;
  currency: Maybe<Currency>;
  category: Maybe<Categories>;
  slug: Maybe<Scalars['String']>;
  product_files: Maybe<Array<Maybe<ProductFiles>>>;
};

/** A paginated list of Products items. */
export type ProductsPaginator = {
  __typename?: 'ProductsPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Products items. */
  data: Array<Products>;
};

export type Query = {
  __typename?: 'Query';
  userByEmail: Maybe<User>;
  userRegisterAnalytics: Maybe<UserRegisterAnalyticsResponse>;
  product: Maybe<Products>;
  category: Maybe<Categories>;
  productVisitByIPv4: Maybe<ProductVisits>;
  productVisitByDate: Maybe<ProductVisitByDate>;
  users: Maybe<UserPaginator>;
  products: Maybe<ProductsPaginator>;
  categories: Maybe<CategoriesPaginator>;
  productFiles: Maybe<ProductFilesPaginator>;
  subscriptions: Maybe<SubscriptionsPaginator>;
  productVisits: Maybe<ProductVisitsPaginator>;
  settings: Maybe<SettingsPaginator>;
};


export type QueryUserByEmailArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QueryUserRegisterAnalyticsArgs = {
  period?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryCategoryArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  show_in_home?: Maybe<Scalars['Boolean']>;
};


export type QueryProductVisitByIPv4Args = {
  IPv4?: Maybe<Scalars['String']>;
};


export type QueryProductVisitByDateArgs = {
  period?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  orderBy?: Maybe<Array<QueryUsersOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  category_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<QueryProductsOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryCategoriesArgs = {
  show_in_home?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryProductFilesArgs = {
  product_id?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QuerySubscriptionsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryProductVisitsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QuerySettingsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** Allowed column names for the `orderBy` argument on field `products` on type `Query`. */
export enum QueryProductsOrderByColumn {
  CreatedAt = 'CREATED_AT'
}

/** Order by clause for the `orderBy` argument on the query `products`. */
export type QueryProductsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryProductsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `orderBy` argument on field `users` on type `Query`. */
export enum QueryUsersOrderByColumn {
  CreatedAt = 'CREATED_AT'
}

/** Order by clause for the `orderBy` argument on the query `users`. */
export type QueryUsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryUsersOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL'
}

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  shipping_cost: Maybe<Scalars['Float']>;
  IVA: Maybe<Scalars['Float']>;
};

/** A paginated list of Settings items. */
export type SettingsPaginator = {
  __typename?: 'SettingsPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Settings items. */
  data: Array<Settings>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem: Maybe<Scalars['Int']>;
  /** Index of the last item in the current page. */
  lastItem: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Subscriptions = {
  __typename?: 'Subscriptions';
  id: Scalars['ID'];
  email: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['DateTime']>;
  updated_at: Maybe<Scalars['DateTime']>;
};

/** A paginated list of Subscriptions items. */
export type SubscriptionsPaginator = {
  __typename?: 'SubscriptionsPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Subscriptions items. */
  data: Array<Subscriptions>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateCategoryInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  show_in_home?: Maybe<Scalars['Boolean']>;
};

export type UpdateProductFileInput = {
  id?: Maybe<Scalars['ID']>;
  principal?: Maybe<Scalars['Boolean']>;
  product_id?: Maybe<Scalars['ID']>;
  file_name?: Maybe<Scalars['String']>;
  file_url?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
};

export type UpdateProductInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  stock?: Maybe<Scalars['Int']>;
  currency?: Maybe<Currency>;
  category_id?: Maybe<Scalars['ID']>;
};

export type UpdateSettingInput = {
  id: Scalars['ID'];
  shipping_cost?: Maybe<Scalars['Float']>;
  IVA?: Maybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  first_name: Maybe<Scalars['String']>;
  last_name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  direction: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['DateTime']>;
  updated_at: Maybe<Scalars['DateTime']>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of User items. */
  data: Array<User>;
};

export type UserRegisterAnalyticsResponse = {
  __typename?: 'UserRegisterAnalyticsResponse';
  data: Maybe<Array<Maybe<Scalars['Int']>>>;
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<Scalars['String']>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<WhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<WhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<WhereConditions>;
};

export type CategoriesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  show_in_home?: Maybe<Scalars['Boolean']>;
}>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Maybe<(
    { __typename?: 'CategoriesPaginator' }
    & { data: Array<(
      { __typename?: 'Categories' }
      & Pick<Categories, 'id' | 'name' | 'slug' | 'show_in_home'>
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);

export type CreateCategoryMutationVariables = Exact<{
  data: CreateCategoryInput;
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: Maybe<(
    { __typename?: 'Categories' }
    & Pick<Categories, 'id' | 'name'>
  )> }
);

export type UpdateCategoryMutationVariables = Exact<{
  data: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: Maybe<(
    { __typename?: 'Categories' }
    & Pick<Categories, 'id' | 'name' | 'show_in_home'>
  )> }
);

export type CategoryQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  show_in_home?: Maybe<Scalars['Boolean']>;
}>;


export type CategoryQuery = (
  { __typename?: 'Query' }
  & { category: Maybe<(
    { __typename?: 'Categories' }
    & Pick<Categories, 'id' | 'name' | 'slug'>
  )> }
);

export type ProductsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  category_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'slug' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
    & { category: Maybe<(
      { __typename?: 'Categories' }
      & Pick<Categories, 'id' | 'name' | 'slug'>
    )> }
  )> }
);

export type UpdateProductMutationVariables = Exact<{
  data: UpdateProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
    & { category: Maybe<(
      { __typename?: 'Categories' }
      & Pick<Categories, 'id' | 'name' | 'slug'>
    )> }
  )> }
);

export type ProductQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
    & { category: Maybe<(
      { __typename?: 'Categories' }
      & Pick<Categories, 'id' | 'name' | 'slug'>
    )>, product_files: Maybe<Array<Maybe<(
      { __typename?: 'ProductFiles' }
      & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name' | 'slug'>
      & { product: Maybe<(
        { __typename?: 'Products' }
        & Pick<Products, 'id' | 'name'>
      )> }
    )>>> }
  )> }
);

export type ProductFilesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['Int']>;
}>;


export type ProductFilesQuery = (
  { __typename?: 'Query' }
  & { productFiles: Maybe<(
    { __typename?: 'ProductFilesPaginator' }
    & { data: Array<(
      { __typename?: 'ProductFiles' }
      & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name' | 'slug'>
      & { product: Maybe<(
        { __typename?: 'Products' }
        & Pick<Products, 'id' | 'name'>
      )> }
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);

export type CreateProductFileMutationVariables = Exact<{
  data: CreateProductFileInput;
}>;


export type CreateProductFileMutation = (
  { __typename?: 'Mutation' }
  & { createProductFile: Maybe<(
    { __typename?: 'ProductFiles' }
    & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name' | 'slug'>
    & { product: Maybe<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name'>
    )> }
  )> }
);

export type UpdateProductFileMutationVariables = Exact<{
  data: UpdateProductFileInput;
}>;


export type UpdateProductFileMutation = (
  { __typename?: 'Mutation' }
  & { updateProductFile: Maybe<(
    { __typename?: 'ProductFiles' }
    & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name' | 'slug'>
    & { product: Maybe<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name'>
    )> }
  )> }
);

export type DeleteProductFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductFileMutation = (
  { __typename?: 'Mutation' }
  & { deleteProductFile: Maybe<(
    { __typename?: 'ProductFiles' }
    & Pick<ProductFiles, 'id'>
  )> }
);

export type ProductsOrderByCreatedQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<QueryProductsOrderByOrderByClause> | QueryProductsOrderByOrderByClause>;
}>;


export type ProductsOrderByCreatedQuery = (
  { __typename?: 'Query' }
  & { products: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug' | 'created_at'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'slug' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);

export type SettingsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type SettingsQuery = (
  { __typename?: 'Query' }
  & { settings: Maybe<(
    { __typename?: 'SettingsPaginator' }
    & { data: Array<(
      { __typename?: 'Settings' }
      & Pick<Settings, 'id' | 'shipping_cost' | 'IVA'>
    )> }
  )> }
);

export type CreateSettingMutationVariables = Exact<{
  data: CreateSettingInput;
}>;


export type CreateSettingMutation = (
  { __typename?: 'Mutation' }
  & { createSetting: Maybe<(
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'shipping_cost' | 'IVA'>
  )> }
);

export type UpdateSettingMutationVariables = Exact<{
  data: UpdateSettingInput;
}>;


export type UpdateSettingMutation = (
  { __typename?: 'Mutation' }
  & { updateSetting: Maybe<(
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'shipping_cost' | 'IVA'>
  )> }
);

export type UsersQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<QueryUsersOrderByOrderByClause> | QueryUsersOrderByOrderByClause>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
    { __typename?: 'UserPaginator' }
    & { paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ), data: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'direction' | 'role' | 'created_at' | 'updated_at'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'direction' | 'role' | 'created_at' | 'updated_at'>
  )> }
);

export type UserRegisterAnalyticsQueryVariables = Exact<{
  period?: Maybe<Scalars['String']>;
}>;


export type UserRegisterAnalyticsQuery = (
  { __typename?: 'Query' }
  & { userRegisterAnalytics: Maybe<(
    { __typename?: 'UserRegisterAnalyticsResponse' }
    & Pick<UserRegisterAnalyticsResponse, 'data'>
  )> }
);

export type UserByEmailQueryVariables = Exact<{
  email?: Maybe<Scalars['String']>;
}>;


export type UserByEmailQuery = (
  { __typename?: 'Query' }
  & { userByEmail: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'direction' | 'role' | 'created_at' | 'updated_at'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'direction' | 'role' | 'created_at' | 'updated_at'>
  )> }
);

export type CreateProductVisitMutationVariables = Exact<{
  data: CreateProductVisitInput;
}>;


export type CreateProductVisitMutation = (
  { __typename?: 'Mutation' }
  & { createProductVisit: Maybe<(
    { __typename?: 'ProductVisits' }
    & Pick<ProductVisits, 'country_code' | 'country_name' | 'city' | 'latitude' | 'longitude' | 'IPv4' | 'state'>
    & { product: Maybe<(
      { __typename?: 'Products' }
      & Pick<Products, 'id'>
    )> }
  )> }
);

export type ProductVisitsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type ProductVisitsQuery = (
  { __typename?: 'Query' }
  & { productVisits: Maybe<(
    { __typename?: 'ProductVisitsPaginator' }
    & { data: Array<(
      { __typename?: 'ProductVisits' }
      & Pick<ProductVisits, 'country_code' | 'country_name' | 'city' | 'latitude' | 'longitude' | 'IPv4' | 'state'>
      & { product: Maybe<(
        { __typename?: 'Products' }
        & Pick<Products, 'id'>
      )> }
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);

export type ProductVisitByIPv4QueryVariables = Exact<{
  IPv4?: Maybe<Scalars['String']>;
}>;


export type ProductVisitByIPv4Query = (
  { __typename?: 'Query' }
  & { productVisitByIPv4: Maybe<(
    { __typename?: 'ProductVisits' }
    & Pick<ProductVisits, 'id' | 'country_code' | 'country_name' | 'city' | 'latitude' | 'longitude' | 'IPv4' | 'state'>
    & { product: Maybe<(
      { __typename?: 'Products' }
      & Pick<Products, 'id'>
    )> }
  )> }
);

export type ProductVisitByDateQueryVariables = Exact<{
  period?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
}>;


export type ProductVisitByDateQuery = (
  { __typename?: 'Query' }
  & { productVisitByDate: Maybe<(
    { __typename?: 'ProductVisitByDate' }
    & Pick<ProductVisitByDate, 'data'>
  )> }
);

export type HomeQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  categoryRingId?: Maybe<Scalars['Int']>;
  categoryNecklaceId?: Maybe<Scalars['Int']>;
  categoryEarringId?: Maybe<Scalars['Int']>;
}>;


export type HomeQuery = (
  { __typename?: 'Query' }
  & { bestSeller: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )> }
  )>, rings: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )> }
  )>, necklaces: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )> }
  )>, earrings: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )> }
  )>, featured: Maybe<(
    { __typename?: 'ProductsPaginator' }
    & { data: Array<(
      { __typename?: 'Products' }
      & Pick<Products, 'id' | 'name' | 'description' | 'price' | 'stock' | 'currency' | 'slug'>
      & { category: Maybe<(
        { __typename?: 'Categories' }
        & Pick<Categories, 'id' | 'name' | 'slug'>
      )>, product_files: Maybe<Array<Maybe<(
        { __typename?: 'ProductFiles' }
        & Pick<ProductFiles, 'id' | 'file_name' | 'file_url' | 'principal' | 'file' | 'original_name'>
        & { product: Maybe<(
          { __typename?: 'Products' }
          & Pick<Products, 'id' | 'name'>
        )> }
      )>>> }
    )> }
  )> }
);

export type CreateSubscriptionMutationVariables = Exact<{
  data: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { createSubscription: Maybe<(
    { __typename?: 'Subscriptions' }
    & Pick<Subscriptions, 'email'>
  )> }
);

export type SubscriptionsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type SubscriptionsQuery = (
  { __typename?: 'Query' }
  & { subscriptions: Maybe<(
    { __typename?: 'SubscriptionsPaginator' }
    & { data: Array<(
      { __typename?: 'Subscriptions' }
      & Pick<Subscriptions, 'id' | 'email'>
    )>, paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'total'>
    ) }
  )> }
);


export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"show_in_home"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"show_in_home"},"value":{"kind":"Variable","name":{"kind":"Name","value":"show_in_home"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"show_in_home"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show_in_home"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"category"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"show_in_home"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"show_in_home"},"value":{"kind":"Variable","name":{"kind":"Name","value":"show_in_home"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CategoryQuery, CategoryQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const ProductFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<ProductFilesQuery, ProductFilesQueryVariables>;
export const CreateProductFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProductFileMutation, CreateProductFileMutationVariables>;
export const UpdateProductFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProductFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductFileMutation, UpdateProductFileMutationVariables>;
export const DeleteProductFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProductFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProductFileMutation, DeleteProductFileMutationVariables>;
export const ProductsOrderByCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productsOrderByCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryProductsOrderByOrderByClause"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsOrderByCreatedQuery, ProductsOrderByCreatedQueryVariables>;
export const SettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"settings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_cost"}},{"kind":"Field","name":{"kind":"Name","value":"IVA"}}]}}]}}]}}]} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
export const CreateSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_cost"}},{"kind":"Field","name":{"kind":"Name","value":"IVA"}}]}}]}}]} as unknown as DocumentNode<CreateSettingMutation, CreateSettingMutationVariables>;
export const UpdateSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_cost"}},{"kind":"Field","name":{"kind":"Name","value":"IVA"}}]}}]}}]} as unknown as DocumentNode<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUsersOrderByOrderByClause"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserRegisterAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userRegisterAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"period"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRegisterAnalytics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"period"},"value":{"kind":"Variable","name":{"kind":"Name","value":"period"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<UserRegisterAnalyticsQuery, UserRegisterAnalyticsQueryVariables>;
export const UserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UserByEmailQuery, UserByEmailQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateProductVisitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductVisit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductVisitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductVisit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"country_name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"IPv4"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProductVisitMutation, CreateProductVisitMutationVariables>;
export const ProductVisitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productVisits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productVisits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"country_name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"IPv4"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<ProductVisitsQuery, ProductVisitsQueryVariables>;
export const ProductVisitByIPv4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productVisitByIPv4"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"IPv4"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productVisitByIPv4"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"IPv4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"IPv4"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"country_name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"IPv4"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ProductVisitByIPv4Query, ProductVisitByIPv4QueryVariables>;
export const ProductVisitByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productVisitByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"period"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productVisitByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"period"},"value":{"kind":"Variable","name":{"kind":"Name","value":"period"}}},{"kind":"Argument","name":{"kind":"Name","value":"product_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<ProductVisitByDateQuery, ProductVisitByDateQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"home"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryRingId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryNecklaceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryEarringId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bestSeller"},"name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"rings"},"name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryRingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"necklaces"},"name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryNecklaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"earrings"},"name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryEarringId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"featured"},"name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file_name"}},{"kind":"Field","name":{"kind":"Name","value":"file_url"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const CreateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const SubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"subscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<SubscriptionsQuery, SubscriptionsQueryVariables>;