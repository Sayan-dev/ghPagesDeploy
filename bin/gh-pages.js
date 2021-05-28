#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");

var argv = yargs.usage("$0 command")
  .command("commit", "commit changes to the repo",
    function (yargs) {
      return yargs.option('m', {
        alias: '',
        describe: 'the commit message'
      })
    },
    function (argv) {
      shell.exec(`git add -A . && git commit -a -m ${argv.message}`);
    })
  .command("push", "push changes up to GitHub", function (yargs) {
    shell.exec("git push origin main --force");
  })
  .command("deploy", "commit and push changes in one step", function (yargs) {
    shell.exec("ghpages commit && ghpages push");
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv