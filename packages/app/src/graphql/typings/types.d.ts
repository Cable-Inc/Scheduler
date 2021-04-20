export type Maybe<T> = T | null;
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
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  randomNumber: Scalars['Float'];
  getCompanyFromName?: Maybe<Company>;
};


export type QueryGetCompanyFromNameArgs = {
  companyName: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  name: Scalars['String'];
  employee_count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newCalendar: Scalars['ID'];
};
