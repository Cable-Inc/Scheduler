import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import LinkIcon from "@material-ui/icons/Link";
import Slide from "@material-ui/core/Slide";
import { ContentSection, TitleSection } from "./Sidebar";
import { useQuery } from "@apollo/client";
import { QUERY_CALENDAR_CONTRIBUTORS } from "../../graphql/functions/calendar";
import { GetCalendarContributors, GetCalendarContributorsVariables } from "../../types/GetCalendarContributors";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MobileInfoMenuProps {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  id: string;
  switchToUser: (user: string) => void;
}

const MobileInfoMenu: React.FC<MobileInfoMenuProps> = ({ isOpen, setOpen, id, switchToUser }) => {
  const classes = useStyles();

  const { data, loading } = useQuery<GetCalendarContributors, GetCalendarContributorsVariables>(
    QUERY_CALENDAR_CONTRIBUTORS,
    {
      variables: { id },
      fetchPolicy: "network-only",
    }
  );

  const copyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  };

  const handleUserClick = (name: string) => {
    setOpen(false);
    switchToUser(name);
  };

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={() => setOpen(false)} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Welcome to Cable Scheduler!
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="p-4">
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
          <TitleSection text="Contributors" />
          <ContentSection text="These are all the people who have looked at and added their name to the timetable." />
          <div className="text-white pb-6 flex flex-wrap gap-2 justify-center">
            {!loading &&
              data &&
              data.getCalendarContributors.map((user) => (
                <ContributorBlock key={user} name={user} clickHandler={handleUserClick} />
              ))}
            {(data?.getCalendarContributors.length ?? 0) % 2 !== 0 && <div className="w-5/12"></div>}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

interface ContributorBlockProps {
  name: string;
  clickHandler: (name: string) => void;
}

const ContributorBlock: React.FC<ContributorBlockProps> = ({ name, clickHandler }) => {
  return (
    <div
      className="w-5/12 bg-blue-500 py-3 text-white rounded shadow text-center font-semibold cursor-pointer"
      onClick={() => clickHandler(name)}
    >
      {name}
    </div>
  );
};

export default MobileInfoMenu;
