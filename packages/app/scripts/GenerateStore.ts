import prompts from "prompts";
import { writeFileSync } from "fs";
import { blue, green, red } from "colors";

const lowercaseFirst = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
const uppercaseFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const generateContentString = (name: string): string =>
  `import { collection, query, where } from "typesaurus";
import { useFirestore } from "../useFirestore";

export interface I${uppercaseFirst(name)} {
  id: string;
}

useFirestore();
const ${lowercaseFirst(name)}Collection = collection<I${uppercaseFirst(name)}>("${lowercaseFirst(name)}s");

export const ${uppercaseFirst(name)}Model = {};

export default ${uppercaseFirst(name)}Model;
`;

(async () => {
  const response = await prompts({
    type: "text",
    name: "name",
    message: "What is the name of the store you would like to create (i.e. User)?",
  });

  const name = response.name;
  if (!name) {
    return console.log(red("Generator Cancelled."));
  }
  console.log(
    blue.bold(
      `📕 Creating ${uppercaseFirst(name)}.store.ts. The collection will be named ${lowercaseFirst(
        name
      )}s. Please adjust this in the file if it's not appropriate.`
    )
  );

  try {
    writeFileSync(`src/db/stores/${uppercaseFirst(name)}.store.ts`, generateContentString(name), { flag: "wx" });
    return console.log(green.bold(`✔ 🎉 Created src/db/stores/${uppercaseFirst(name)}.store.ts successfully!`));
  } catch (err) {
    return console.log(red.bold("An error occurred. The file may already exist."));
  }
})();
