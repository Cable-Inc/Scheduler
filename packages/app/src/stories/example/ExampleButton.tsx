import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { ReactNode } from "react";

interface IButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

const ExampleButton: React.FC<IButtonProps> = (props) => (
  <Button {...props} variant="contained" color="primary">
    {props.children}
  </Button>
);

ExampleButton.defaultProps = {
  children: null,
  onClick: () => {
    //
  },
};

export default ExampleButton;
