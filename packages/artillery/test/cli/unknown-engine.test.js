const tap = require('node:test');
const assert = require('node:assert');
const { execute } = require('../helpers');

tap.test(
  'Throws when encountered an unknown engine in scenarios',
  async (_t) => {
    const [exitCode, output] = await execute([
      'run',
      'test/scripts/unknown_engine.json'
    ]);

    assert.strictEqual(exitCode, 11, 'CLI should exit with code 11');
    assert.ok(output.stdout.includes(
        'Failed to run scenario "0": unknown engine "playwright". Did you forget to include it in "config.engines.playwright"?'
      ), 'Error message about missing "config[engineName]" is not being printed');
  }
);

tap.test(
  'Reports an unknown engine when its configured module cannot be loaded',
  async (_t) => {
    const [exitCode, output] = await execute([
      'run',
      'test/scripts/unknown_engine_module_missing.json'
    ]);

    assert.strictEqual(exitCode, 11, 'CLI should exit with code 11');
    assert.ok(output.stdout.includes(
        'Failed to run scenario "0": unknown engine "missing-engine". Did you forget to include it in "config.engines.missing-engine"?'
      ), 'Error message about the unavailable engine module is not being printed');
  }
);

tap.test(
  'Reports an unknown engine when a configured hook engine cannot be loaded',
  async (_t) => {
    const [exitCode, output] = await execute([
      'run',
      'test/scripts/unknown_engine_module_missing_hook.json'
    ]);

    assert.strictEqual(exitCode, 1, 'CLI should exit with code 1');
    assert.ok(output.stderr.includes(
        'Failed to run before hook: unknown engine "missing-engine". Did you forget to include it in "config.engines.missing-engine"?'
      ), 'Error message about the unavailable hook engine module is not being printed');
  }
);
