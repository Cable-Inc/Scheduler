import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { MUTATE_NEW_CALENDAR } from "../../graphql/functions/calendar";
import { useRouter } from "next/router";
import { NewCalendar } from "../../types/NewCalendar";
import { CircularProgress } from "@material-ui/core";
import Fullscreen from "../../components/util/Fullscreen";

const index: React.FC = () => {
  const [call, { data }] = useMutation<NewCalendar>(MUTATE_NEW_CALENDAR);

  const router = useRouter();

  useEffect(() => {
    call();
  }, []);

  if (!data) {
    return (
      <Fullscreen>
        <CircularProgress />
      </Fullscreen>
    );
  }

  const calendarId = data.newCalendar;

  router.push("/calendar/" + calendarId);
  return (
    <Fullscreen>
      <CircularProgress />
    </Fullscreen>
  );
};

export default index;
