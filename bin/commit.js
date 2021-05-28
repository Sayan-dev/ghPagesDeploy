#! /usr/bin/env node
var shell = require("shelljs");

shell.exec("git add . && git commit -m 'gh-pages update'");
      