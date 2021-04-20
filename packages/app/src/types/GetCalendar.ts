/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCalendar
// ====================================================

export interface GetCalendar_getCalendar_users_times {
  __typename: "TimeEntry";
  start: string;
  end: string;
}

export interface GetCalendar_getCalendar_users {
  __typename: "User";
  username: string;
  times: GetCalendar_getCalendar_users_times[];
}

export interface GetCalendar_getCalendar {
  __typename: "Calendar";
  users: GetCalendar_getCalendar_users[];
}

export interface GetCalendar {
  getCalendar: GetCalendar_getCalendar;
}

export interface GetCalendarVariables {
  id: string;
}
