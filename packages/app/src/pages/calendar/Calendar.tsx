import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Fullscreen } from "@material-ui/icons";
import { startOfWeek, setMinutes, setHours, setDay, getDay, getHours, getMinutes, compareAsc } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { TimeGridScheduler, classes as defaultClasses } from "react-weekly-schedule";
import { ScheduleType } from "react-weekly-schedule/src/types";
import "react-weekly-schedule/index.css";
import useUndo from "use-undo";
import Header from "../../stories/header/Header";
import {
  MUTATE_NEW_CALENDAR_USER,
  MUTATE_UPDATE_CALENDAR_USER,
  QUERY_OPTIMAL_SCHEDULE,
} from "../../graphql/functions/calendar";
import { GetOptimalTime, GetOptimalTimeVariables } from "../../types/GetOptimalTime";
import { NewCalendarUser, NewCalendarUserVariables } from "../../types/NewCalendarUser";
import { UpdateCalendarUser, UpdateCalendarUserVariables } from "../../types/UpdateCalendarUser";
import EditorSidebar from "./EditorSidebar";
import Sidebar from "./Sidebar";
import CalendarTooltip from "./CalendarTooltip";

interface CalendarProps {
  id: string;
}

type States = "INTRO" | "EDITOR";

const Calendar: React.FC<CalendarProps> = ({ id }) => {
  const isOnClient = useClientOnly();

  const [appState, setAppState] = useState<States>("INTRO");
  const [username, setUsername] = useState<string>("");

  const [createNewCalendarUser, { data }] = useMutation<NewCalendarUser, NewCalendarUserVariables>(
    MUTATE_NEW_CALENDAR_USER
  );

  const [updateCalendarUser, { data: updateData }] = useMutation<UpdateCalendarUser, UpdateCalendarUserVariables>(
    MUTATE_UPDATE_CALENDAR_USER
  );

  const { data: optimalSchedule, loading, refetch: refetchOptimal } = useQuery<GetOptimalTime, GetOptimalTimeVariables>(
    QUERY_OPTIMAL_SCHEDULE,
    {
      variables: { id },
      fetchPolicy: "no-cache",
    }
  );

  const [weekStart, setWeekStart] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(1);
  const originDate = useMemo(
    () =>
      startOfWeek(new Date("2019-03-04"), {
        weekStartsOn: weekStart,
      }),
    [weekStart]
  );

  const [
    scheduleState,
    {
      set: setSchedule,
      reset: resetSchedule,
      undo: undoSchedule,
      redo: redoSchedule,
      canUndo: canUndoSchedule,
      canRedo: canRedoSchedule,
    },
  ] = useUndo<ScheduleType>([]);

  const [shouldDisable, setShouldDisable] = useState(true);

  useEffect(() => {
    if (appState === "EDITOR" && data) {
      const user = data.newCalendarUser.users.find((u) => u.username === username);
      console.log("IN EDITOR MODE");
      if (user) {
        const transformed = user.times.map((range) => [new Date(range.start), new Date(range.end)] as [Date, Date]);
        const adjusted = transformed
          .map(
            (range) =>
              [
                setMinutes(
                  setHours(
                    setDay(originDate, getDay(range[0]), {
                      weekStartsOn: weekStart,
                    }),
                    getHours(range[0])
                  ),
                  getMinutes(range[0])
                ),
                setMinutes(
                  setHours(
                    setDay(originDate, getDay(range[1]), {
                      weekStartsOn: weekStart,
                    }),
                    getHours(range[1])
                  ),
                  getMinutes(range[1])
                ),
              ] as [Date, Date]
          )
          .sort(([start], [end]) => compareAsc(start, end));
        setShouldDisable(false);
        setSchedule(adjusted);
      }
    }
  }, [appState, data]);

  useEffect(() => {
    if (appState === "INTRO" && optimalSchedule) {
      const transformed = optimalSchedule.getOptimalTime.map(
        (range) => [new Date(range.start), new Date(range.end)] as [Date, Date]
      );
      console.log(transformed);
      const adjusted = transformed
        .map(
          (range) =>
            [
              setMinutes(
                setHours(
                  setDay(originDate, getDay(range[0]), {
                    weekStartsOn: weekStart,
                  }),
                  getHours(range[0])
                ),
                getMinutes(range[0])
              ),
              setMinutes(
                setHours(
                  setDay(originDate, getDay(range[1]), {
                    weekStartsOn: weekStart,
                  }),
                  getHours(range[1])
                ),
                getMinutes(range[1])
              ),
            ] as [Date, Date]
        )
        .sort(([start], [end]) => compareAsc(start, end));
      console.log(adjusted);
      setSchedule(adjusted);
      setShouldDisable(true);
      console.log(scheduleState);
    }
  }, [optimalSchedule, appState]);

  useEffect(() => {
    const slots = Array.from(document.getElementsByClassName("react-draggable"));
    slots.forEach((el) => {
      if (appState === "EDITOR") {
        el.classList.remove("calendar-optimal");
        //el.classList.add("calendar-editing");
      } else {
        el.classList.add("calendar-optimal");
        //el.classList.remove("calendar-editing");
      }
    });
  });

  const [height, setHeight] = useState(40);

  const style = {
    "--cell-height": `${height}px`,
    "--cell-width": `${22}px`,
    height: "85%",
  } as React.CSSProperties;

  const handleIntroToEditor = async (name: string) => {
    if (!id || !name || !(typeof id === "string")) {
      return;
    }
    setAppState("EDITOR");
    setUsername(name);
    await createNewCalendarUser({
      variables: {
        id,
        username: name,
      },
    });
  };

  const timeFormat = (date: Date) => {
    const [years, months, days, hours, minutes] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
    return `${years}-${months}-${days} ${hours}:${minutes}`;
  };

  const handleSaveTimetable = async () => {
    if (!id || !username || !(typeof id === "string")) {
      return;
    }
    await updateCalendarUser({
      variables: {
        id,
        times: scheduleState.present.map((range) => range.map((dateObj) => timeFormat(dateObj))),
        username,
      },
      refetchQueries: [{ query: QUERY_OPTIMAL_SCHEDULE, variables: { id } }],
      update: async () => {
        await refetchOptimal();
        setAppState("INTRO");
      },
    });
  };

  if (loading) {
    return (
      <Fullscreen>
        <CircularProgress />
      </Fullscreen>
    );
  }
  //${shouldDisable ? "pointer-events-none" : ""}
  return (
    <div className="h-full overflow-visible">
      <Header />
      {isOnClient && (
        <div className="flex flex-row h-full overflow-visible">
          <div className={`w-5/6 h-full `}>
            <div className="w-full p-6 text-white font-bold text-2xl text-center bg-[#512da8]">
              {appState === "EDITOR" ? "Editing" : "Optimal Schedule"}
            </div>
            <div style={style}>
              <TimeGridScheduler
                style={{ width: "100%", height: "100%" }}
                classes={defaultClasses}
                originDate={new Date("2019-03-04")}
                schedule={scheduleState.present}
                onChange={setSchedule}
                visualGridVerticalPrecision={60}
                eventRootComponent={CalendarTooltip}
              />
            </div>
          </div>
          <div className="w-1/6" style={{ minWidth: "260px" }}>
            {appState === "INTRO" && <Sidebar id={id} onNameSubmit={handleIntroToEditor} />}
            {appState === "EDITOR" && <EditorSidebar username={username} onSave={handleSaveTimetable} />}
          </div>
        </div>
      )}
    </div>
  );
};

export const useClientOnly = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default Calendar;
