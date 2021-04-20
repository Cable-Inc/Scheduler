import React, { useEffect, useState } from "react";
import Layout from "../components/MyLayout";
import ExampleButton from "../stories/example/ExampleButton";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Query, QueryGetCompanyFromNameArgs } from "../graphql/typings/types";
import { CircularProgress, TextField } from "@material-ui/core";

const Quote: React.FC = () => {
  const { data, loading, error } = useQuery<Query>(
    gql`
      query {
        randomNumber
        ping
      }
    `
  );

  const [companyLookup, setCompanyLookup] = useState("");
  const [employees, setEmployees] = useState(0);

  const [rand, setRand] = useState(0);
  const [msg, setMsg] = useState("");

  const employeeQuery = useQuery<Query, QueryGetCompanyFromNameArgs>(
    gql`
      query CompanyData($companyName: String!) {
        getCompanyFromName(companyName: $companyName) {
          name
          employee_count
        }
      }
    `,
    { variables: { companyName: companyLookup }, fetchPolicy: "standby" }
  );

  useEffect(() => {
    if (loading || error || !data) {
      return;
    }
    setRand(data.randomNumber);
    setMsg(data.ping);
  }, [data]);

  useEffect(() => {
    if (employeeQuery.loading || employeeQuery.error || !employeeQuery.data) {
      return;
    }
    setEmployees(employeeQuery.data.getCompanyFromName?.employee_count ?? 0);
  }, [employeeQuery]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Layout>
            <p>This is the about page.</p>
          </Layout>
          <div className="p-4">
            <p>Your random number is {rand}</p>
            <p>Your message is {msg}</p>
          </div>
          <div className="p-4">
            <TextField onChange={(e) => setCompanyLookup(e.target.value)} value={companyLookup}></TextField>
            <ExampleButton onClick={(e) => employeeQuery.refetch()}>Get Number of Employees</ExampleButton>
            <p>{"Please note only 'Big Co' and 'Cable Ltd' is in the database."}</p>
            <div className="py-4">
              <h3>Company has {employees} employees.</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quote;
