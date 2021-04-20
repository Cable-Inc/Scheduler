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
  getCalendar: Calendar;
  getOptimalTime: Array<TimeEntry>;
  getCalendarContributors: Array<Scalars['String']>;
};


export type QueryGetCompanyFromNameArgs = {
  companyName: Scalars['String'];
};


export type QueryGetCalendarArgs = {
  id: Scalars['String'];
};


export type QueryGetOptimalTimeArgs = {
  id: Scalars['String'];
};


export type QueryGetCalendarContributorsArgs = {
  id: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  name: Scalars['String'];
  employee_count: Scalars['Int'];
};

export type Calendar = {
  __typename?: 'Calendar';
  users: Array<User>;
  calculated: Array<TimeEntry>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  times: Array<TimeEntry>;
};

export type TimeEntry = {
  __typename?: 'TimeEntry';
  start: Scalars['String'];
  end: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newCalendar: Scalars['ID'];
  newCalendarUser: Calendar;
  updateCalendarUser: Calendar;
};


export type MutationNewCalendarUserArgs = {
  id: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateCalendarUserArgs = {
  id: Scalars['String'];
  username: Scalars['String'];
  times: Array<Array<Scalars['String']>>;
};
