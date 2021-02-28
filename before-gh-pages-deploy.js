const fs = require("fs");
const packageJSON = require("./package.json");
packageJSON.homepage = "https://0xgg.io/crossnote-legacy";
fs.writeFileSync(
  "./package.json",
  JSON.stringify(packageJSON, null, "  ") + "\n",
);
