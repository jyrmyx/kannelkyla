// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { defineHastPlugin } from 'satteri';

// The published site is https://www.kannelkyla.fi, served at the domain root.
// PAGES_BASE is set only when checking the old /kannelkyla project path.
const base = pagesBase(process.env.PAGES_BASE);
const basePrefix = base === '/' ? '' : base;

/** @type {import('astro').AstroUserConfig} */
const config = {
  site: process.env.SITE ?? 'https://www.kannelkyla.fi',
  base,
  vite: {
    plugins: [tailwindcss()],
  },
};

// Markdown keeps root-relative links. Astro does not prefix them for `base`.
if (basePrefix) {
  config.markdown = {
    processor: satteri({
      hastPlugins: [prefixBasePlugin(basePrefix)],
    }),
  };
}

// https://astro.build/config
export default defineConfig(config);

/** @param {string | undefined} raw */
function pagesBase(raw) {
  if (!raw || raw === '/') return '/';
  const value = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  if (!value.startsWith('/')) return `/${value}`;
  return value;
}

/** @param {string} prefix */
function prefixBasePlugin(prefix) {
  return defineHastPlugin({
    name: 'prefix-base',
    element: {
      filter: ['a', 'img'],
      visit(node, ctx) {
        const properties = node.properties ?? {};
        for (const key of ['href', 'src']) {
          const value = properties[key];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
            ctx.setProperty(node, key, prefix + value);
          }
        }
      },
    },
  });
}