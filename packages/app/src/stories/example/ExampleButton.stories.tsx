import { storiesOf } from "@storybook/react";
import React from "react";
import CableButton from "./ExampleButton";

storiesOf("Button", module).add("Primary Contained", () => <CableButton>Hello Button</CableButton>);
