import { readFileSync } from "fs";
import { EOL } from "os";
import { bold } from "colors";

const fail = () => {
  console.log(bold.red("🛑 Your .env file is missing expected keys from .env.example. "));
  process.exit(1);
};

try {
  const actual = readFileSync(".env");
  const example = readFileSync(".env.example");

  const actualArr = actual.toString().split("\n");
  const exampleArr = example.toString().split("\n");

  for (let i = 0; i < actualArr.length; i++) {
    const actualKey = actualArr[i]?.split("=")[0];
    const exampleKey = exampleArr[i]?.split("=")[0];
    if (exampleKey?.trim() == "") {
      continue;
    }
    if (actualKey !== exampleKey) {
      fail();
    }
  }
} catch (e) {
  console.log(e);
  fail();
}
