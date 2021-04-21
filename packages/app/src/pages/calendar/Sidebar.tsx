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
    <div className="p-4 pb-16">
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
      <TitleSection text="Contributors" />
      <ContentSection text="These are all the people who have looked at and added their name to the timetable." />
      <div className="text-white pb-6 flex flex-wrap gap-2 justify-center">
        {!loading &&
          data &&
          data.getCalendarContributors.map((user) => (
            <ContributorBlock key={user} name={user} clickHandler={onNameSubmit} />
          ))}
      </div>
    </div>
  );
};

interface TitleProps {
  text: string;
}

export const TitleSection: React.FC<TitleProps> = ({ text }) => (
  <div className="text-white font-semibold text-xl pb-4">{text}</div>
);

interface ContentProps {
  text: string;
}

export const ContentSection: React.FC<ContentProps> = ({ text }) => (
  <div className="text-white font-normal pb-4">{text}</div>
);

interface ContributorBlockProps {
  name: string;
  clickHandler: (name: string) => void;
}

const ContributorBlock: React.FC<ContributorBlockProps> = ({ name, clickHandler }) => {
  return (
    <Button fullWidth variant="contained" color="primary" onClick={() => clickHandler(name)}>
      {name}
    </Button>
    // <div
    //   className="w-full bg-blue-500 py-3 text-white rounded shadow text-center font-semibold cursor-pointer"
    //   onClick={() => clickHandler(name)}
    // >
    //   {name}
    // </div>
  );
};

export default Sidebar;
