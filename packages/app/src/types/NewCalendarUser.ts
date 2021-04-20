/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NewCalendarUser
// ====================================================

export interface NewCalendarUser_newCalendarUser_users_times {
  __typename: "TimeEntry";
  start: string;
  end: string;
}

export interface NewCalendarUser_newCalendarUser_users {
  __typename: "User";
  username: string;
  times: NewCalendarUser_newCalendarUser_users_times[];
}

export interface NewCalendarUser_newCalendarUser {
  __typename: "Calendar";
  users: NewCalendarUser_newCalendarUser_users[];
}

export interface NewCalendarUser {
  newCalendarUser: NewCalendarUser_newCalendarUser;
}

export interface NewCalendarUserVariables {
  username: string;
  id: string;
}
