import { Button } from "@material-ui/core";
import React from "react";

interface EditorSidebarProps {
  onSave: () => void;
  username: string;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ onSave, username }) => {
  return (
    <div className="h-full mx-4 my-4">
      <TitleSection text="Enter Your Schedule" />
      <ContentSection text="Drag on the calendar when you are available for meetings. Click save when you've finished!" />
      <TitleSection text={`You are editing ${username}'s Schedule`} />
      <div className="flex flex-col">
        <Button variant="contained" onClick={() => onSave()}>
          Save
        </Button>
      </div>
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

const ContentSection: React.FC<ContentProps> = ({ text }) => (
  <div className="text-white font-semibold pb-4">{text}</div>
);

export default EditorSidebar;
