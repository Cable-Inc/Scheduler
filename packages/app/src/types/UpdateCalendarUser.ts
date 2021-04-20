/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCalendarUser
// ====================================================

export interface UpdateCalendarUser_updateCalendarUser_users_times {
  __typename: "TimeEntry";
  start: string;
  end: string;
}

export interface UpdateCalendarUser_updateCalendarUser_users {
  __typename: "User";
  username: string;
  times: UpdateCalendarUser_updateCalendarUser_users_times[];
}

export interface UpdateCalendarUser_updateCalendarUser {
  __typename: "Calendar";
  users: UpdateCalendarUser_updateCalendarUser_users[];
}

export interface UpdateCalendarUser {
  updateCalendarUser: UpdateCalendarUser_updateCalendarUser;
}

export interface UpdateCalendarUserVariables {
  id: string;
  username: string;
  times: string[][];
}
