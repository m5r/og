/**
 * Modified version of https://unpkg.com/twemoji@13.1.0/dist/twemoji.esm.js.
 */
/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
const U200D = String.fromCharCode(8205); // zero-width joiner
const UFE0Fg = /\uFE0F/g; // variation selector regex
export function getIconCode(char: string) {
	return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, "") : char);
}
function toCodePoint(unicodeSurrogates: string) {
	var r: string[] = [],
		c = 0,
		p = 0,
		i = 0;
	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++);
		if (p) {
			r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
			p = 0;
		} else if (55296 <= c && c <= 56319) {
			p = c;
		} else {
			r.push(c.toString(16));
		}
	}
	return r.join("-");
}
const apis = {
	twemoji: (code: string) =>
		"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/" + code.toLowerCase() + ".svg",
	openmoji: "https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/",
	blobmoji: "https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/",
	noto: "https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/",
	fluent: (code: string) =>
		"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/" + code.toLowerCase() + "_color.svg",
	fluentFlat: (code: string) =>
		"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/" + code.toLowerCase() + "_flat.svg",
};
export type EmojiType = keyof typeof apis;
export function loadEmoji(code: string, type?: EmojiType) {
	// https://github.com/svgmoji/svgmoji
	if (!type || !apis[type]) {
		type = "twemoji";
	}
	const api = apis[type];
	if (typeof api === "function") {
		return fetch(api(code));
	}
	return fetch(`${api}${code.toUpperCase()}.svg`);
}
