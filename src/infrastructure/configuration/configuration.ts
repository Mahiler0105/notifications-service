import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `config.${process.env.NODE_ENV}.yaml`;

export default () => {
  return yaml.load(
    readFileSync(
      join(__dirname, '../../../configuration', YAML_CONFIG_FILENAME),
      'utf8',
    ),
  ) as Record<string, any>;
};
