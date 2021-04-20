import React from "react";
import Tippy from "@tippyjs/react";
import { EventRootProps } from "react-weekly-schedule/src/types";
import { DefaultEventRootComponent } from "react-weekly-schedule";
import { Delete } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const CalendarTooltip = React.forwardRef<any, EventRootProps>(function EventRoot(
  { handleDelete, disabled, ...props },
  ref
) {
  return (
    <Tippy
      disabled={disabled}
      arrow
      interactive
      animation={false}
      hideOnClick={false}
      className="bg-gray-800 text-white rounded"
      content={
        <Button
          onClick={handleDelete}
          size="large"
          className="bg-gray-800"
          startIcon={<Delete className="fill-current text-white" />}
        >
          Delete
        </Button>
      }
    >
      <DefaultEventRootComponent handleDelete={handleDelete} disabled={disabled} {...props} ref={ref} />
    </Tippy>
  );
});

export default CalendarTooltip;
