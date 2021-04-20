/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOptimalTime
// ====================================================

export interface GetOptimalTime_getOptimalTime {
  __typename: "TimeEntry";
  start: string;
  end: string;
}

export interface GetOptimalTime {
  getOptimalTime: GetOptimalTime_getOptimalTime[];
}

export interface GetOptimalTimeVariables {
  id: string;
}
