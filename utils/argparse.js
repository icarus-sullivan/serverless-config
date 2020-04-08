const ArgumentParser = require('argparse').ArgumentParser;

module.exports = ({ version, addHelp, description, args = [] }) => {
  const parser = new ArgumentParser({ version, addHelp, description });
  args.forEach((a) => parser.addArgument(...a));

  return parser.parseArgs();
}