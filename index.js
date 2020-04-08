const glob = require('glob');
const slim = require('@sullivan/slim');
const argparse = require('./utils/argparse');
const resolve = require('./utils/resolve');

const options = argparse({
  version: '1.0.0',
  addHelp: true,
  description: 'Contextual arguments to be dynamically injected',
  args: [
    [
      ['-s', '--stage'],
      {
        help: 'Environmental stage',
      }
    ],
    [
      ['-r', '--region'],
      {
        help: 'Environmental region',
      }
    ]
  ]
});

const path = require('path');

const files = glob.sync('configuration/*');
const c = files
  .map((f) => path.join(__dirname, f))
  .map(resolve)
  .map(JSON.stringify)
  .map((v) => slim(v)(options))
  .map(JSON.parse)
  .reduce((a, b) => ({ ...a, ... b}), {});
console.log("files", files);
console.log('c', c);
console.log("options", options);