#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");

var argv = yargs.usage("$0 command")
  .command("commit", "commit changes to the repo",
    function (yargs) {
      return yargs.option('m', {
        alias: 'message',
        default: 'new commit',
        describe: 'the commit message'
      }).argv
    },
    function (argv) {
      shell.exec(`git add -A . && git commit -a -m "${argv.message}"`);
    })
  .command("push", "push changes up to GitHub",
    function (yargs) {
      return yargs.option('b', {
        'b': {
          alias: 'branch',
          default: 'main',
          describe: 'the branch'
        }
      }).argv
    }, function (argv) {
      shell.exec(`git push origin ${argv.b} --force`);
    })
  .command("deploy", "commit and push changes in one step",
    function (yargs) {
      return yargs.options(
        {
          'm': {
            alias: 'message',
            default: 'new commit',
            describe: 'the commit message'
          },
          'b': {
            alias: 'branch',
            default: 'main',
            describe: 'the branch'
          }
        }).argv
    }, function (argv) {
      shell.exec(`ghd commit -m "${argv.m}" && ghd push -b ${argv.b}`);
    })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv