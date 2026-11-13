import { resolve } from '$app/paths';

// resolve() is typed against known route ids; paths here come from our own page list.
const resolvePath = resolve as (path: string) => string;

/**
 * Internal link with the site's base folder added: '/contacts/' → '/ZeroBounce/contacts/'
 * on GitHub Pages, unchanged on the site's own domain. Use it for every internal href.
 * Anchors are kept: '/#calc' → '/ZeroBounce/#calc'.
 */
export function link(path: string): string {
	const [pathname, hash] = path.split('#');
	return resolvePath(pathname || '/') + (hash ? `#${hash}` : '');
}
