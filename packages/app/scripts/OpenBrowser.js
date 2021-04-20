/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var os_1 = require("os");
var platform = process.platform;
var cmd = "";
if (platform === "linux" && os_1.release().indexOf("Microsoft") !== -1) {
  platform = "win32";
}
switch (platform) {
  case "win32":
    cmd = "start";
    break;
  case "darwin":
    cmd = "open";
    break;
  default:
    cmd = "xdg-open";
    break;
}
child_process_1.exec(cmd + " http://localhost:3000", function (error, stdout, stderr) {
  if (error) {
    console.log("error: " + error.message);
    return;
  }
  if (stderr) {
    console.log("stderr: " + stderr);
    return;
  }
});
