import React, { useEffect, useState } from "react";
import Layout from "../components/MyLayout";
import ExampleButton from "../stories/example/ExampleButton";
import { Search } from "@material-ui/icons";

import { Ninja } from "@klayver/poe-api-wrappers";

export const About: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    Ninja.Currency.get("Standard", "Currency").then((collection) => {
      for (const currency of collection.entries) {
        setCurrencies([...currencies, `${currency.name} costs ${currency.chaosEquivalent} Chaos Orb. `]);
      }
    });
  }, []);

  return (
    <>
      {currencies.forEach((currency, index) => (
        <div key={index}>{currency}</div>
      ))}
    </>
  );
};
export default About;
