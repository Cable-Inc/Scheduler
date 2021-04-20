import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import LinkIcon from "@material-ui/icons/Link";
import { useQuery } from "@apollo/client";
import { QUERY_CALENDAR_CONTRIBUTORS } from "../../graphql/functions/calendar";
import { GetCalendarContributors, GetCalendarContributorsVariables } from "../../types/GetCalendarContributors";

interface SidebarProps {
  onNameSubmit: (name: string) => void;
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNameSubmit, id }) => {
  const [text, setText] = useState("");

  const copyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  };

  const { data, loading } = useQuery<GetCalendarContributors, GetCalendarContributorsVariables>(
    QUERY_CALENDAR_CONTRIBUTORS,
    {
      variables: { id },
      fetchPolicy: "network-only",
    }
  );

  return (
    <div className="h-full mx-4 my-4">
      <TitleSection text="Welcome to Cable Scheduler!" />
      <ContentSection text="Cable Scheduler makes it easy to schedule an event with your friends or colleagues. No account required!" />
      <TitleSection text="How it Works" />
      <ul className="list-disc text-white mx-4 pb-6">
        <li>Type your name</li>
        <li>Drag on the calendar when you are available</li>
        <li>Remember your name so you can change when you are available!</li>
      </ul>
      <TitleSection text="Keep the Link" />
      <ContentSection text="Make sure you keep hold of this link, its the only way you can see this calendar!" />
      <div className="flex flex-col pb-8">
        <Button variant="contained" color="default" startIcon={<LinkIcon />} onClick={copyLink}>
          Copy Link
        </Button>
      </div>
      <TitleSection text="Add your Schedule" />
      <form autoComplete="off" name="scheduleForm" className="pb-6">
        <div className="flex flex-col gap-y-4">
          <TextField
            label="Name"
            required
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            name="scheduleName"
            type="search"
          />
          <Button
            variant="contained"
            color="secondary"
            disabled={!text || !text.trim()}
            onClick={() => onNameSubmit(text)}
          >
            Go!
          </Button>
        </div>
      </form>
      <TitleSection text="Listers" />
      <ContentSection text="These are all the people who have looked at and added their name to the timetable." />
      <ul className="list-disc text-white mx-4 pb-6">
        {!loading &&
          data &&
          data.getCalendarContributors.map((user) => (
            <li className="pb-1 text-white" key={user}>
              {user}
            </li>
          ))}
      </ul>
    </div>
  );
};

interface TitleProps {
  text: string;
}

const TitleSection: React.FC<TitleProps> = ({ text }) => (
  <div className="text-white font-semibold text-xl pb-4">{text}</div>
);

interface ContentProps {
  text: string;
}

const ContentSection: React.FC<ContentProps> = ({ text }) => <div className="text-white font-normal pb-4">{text}</div>;

export default Sidebar;
