const glob = require('glob');
const slim = require('@sullivan/slim');
const path = require('path');
const fs = require('fs-extra');
const argparse = require('./utils/argparse');
const resolve = require('./utils/resolve');
const merge = require('./utils/merge');

const BUILD_DIR = path.join(__dirname, 'build');
fs.removeSync(BUILD_DIR);

const options = argparse({
  version: '1.0.0',
  addHelp: true,
  description: 'Contextual arguments to be dynamically injected',
  args: [
    [
      ['-s', '--stage'],
      {
        help: 'Environmental stage',
      },
    ],
    [
      ['-r', '--region'],
      {
        help: 'Environmental region',
      },
    ],
  ],
});

const files = glob.sync('configuration/*');

const config = files
  .map((f) => path.join(__dirname, f))
  .map(resolve)
  .map(JSON.stringify)
  .map((v) => slim(v)(options))
  .map(JSON.parse)
  .reduce(merge, {
    events: [],
  });

// Write build dir and config file
fs.ensureDir(BUILD_DIR);
fs.writeFileSync(
  path.join(BUILD_DIR, 'config.json'),
  JSON.stringify(config, null, 2),
);
