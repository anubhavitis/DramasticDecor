import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

const css = postcss.parse(await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8'));
const palettes: Record<string, Record<string, string>> = { light: {}, dark: {} };
css.walkRules(':root', rule => {
  const parent = rule.parent;
  const mode = parent?.type === 'atrule' && parent.name === 'media' && parent.params === '(prefers-color-scheme: dark)' ? 'dark' : 'light';
  rule.walkDecls(decl => { palettes[mode][decl.prop] = decl.value; });
});
const luminance = (hex: string) => {
  assert.match(hex, /^#[\da-f]{6}$/i, 'Use an opaque theme color for text contrast checks');
  const channels = hex.slice(1).match(/../g)!.map(v => parseInt(v, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
const contrast = (a: string, b: string) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
for (const mode of ['light', 'dark']) {
  test(`${mode} theme keeps body text, buttons, menus and artwork readable`, () => {
    const p = palettes[mode];
    for (const [foreground, background] of [
      ['--foreground', '--background'], ['--muted-foreground', '--background'],
      ['--primary-foreground', '--primary'], ['--primary-foreground', '--primary-dark'],
      ['--popover-foreground', '--popover'], ['--art-foreground', '--art'],
      ['--art-caption', '--art'], ['--bar-foreground', '--bar'],
    ]) {
      assert.ok(p[foreground] && p[background], `${mode} is missing its ${foreground}/${background} palette`);
      assert.ok(contrast(p[foreground], p[background]) >= 4.5, `${mode} ${foreground} on ${background} needs 4.5:1 contrast`);
    }
    assert.ok(contrast(p['--rust'], p['--background']) >= 3, `${mode} large accent headings need 3:1 contrast`);
  });
}
