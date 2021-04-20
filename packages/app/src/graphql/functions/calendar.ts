import { gql } from "@apollo/client";

export const MUTATE_NEW_CALENDAR = gql`
  mutation NewCalendar {
    newCalendar
  }
`;

export const MUTATE_NEW_CALENDAR_USER = gql`
  mutation NewCalendarUser($username: String!, $id: String!) {
    newCalendarUser(username: $username, id: $id) {
      users {
        username
        times {
          start
          end
        }
      }
    }
  }
`;

export const MUTATE_UPDATE_CALENDAR_USER = gql`
  mutation UpdateCalendarUser($id: String!, $username: String!, $times: [[String!]!]!) {
    updateCalendarUser(id: $id, username: $username, times: $times) {
      users {
        username
        times {
          start
          end
        }
      }
    }
  }
`;

export const QUERY_CALENDAR = gql`
  query GetCalendar($id: String!) {
    getCalendar(id: $id) {
      users {
        username
        times {
          start
          end
        }
      }
    }
  }
`;

export const QUERY_OPTIMAL_SCHEDULE = gql`
  query GetOptimalTime($id: String!) {
    getOptimalTime(id: $id) {
      start
      end
    }
  }
`;

export const QUERY_CALENDAR_CONTRIBUTORS = gql`
  query GetCalendarContributors($id: String!) {
    getCalendarContributors(id: $id)
  }
`;
