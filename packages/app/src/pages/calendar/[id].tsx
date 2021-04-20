import { CircularProgress } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Fullscreen from "../../components/util/Fullscreen";
import Calendar from "./Calendar";

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return <Calendar id={id} />;
  }

  return (
    <Fullscreen>
      <CircularProgress />
    </Fullscreen>
  );
};

export default Page;

/** React hook that returns true if the component has mounted client-side */
