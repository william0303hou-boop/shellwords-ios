// 由 resources/icon.svg 生成 @capacitor/assets 所需的 PNG（icon 1024、splash 2732）
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';

const SHELL_PATHS =
  "<path d='M32 14c-9 4-14 12-14 20 0 9 6 16 14 16s14-7 14-16c0-8-5-16-14-20z' fill='#fff'/>" +
  "<path d='M32 14c-4 8-4 16 0 24s10 10 10 10c-4-7-5-16-1-24S32 14 32 14z' fill='#8FB3FF'/>" +
  "<path d='M32 20c6 4 9 9 9 15 0 4-2 7-5 9-2-3-3-7-3-11 0-5 1-9 4-13z' fill='#EAF0FF'/>";

mkdirSync('resources', { recursive: true });

// App 圖標：滿版藍底（不透明），iOS 會自動裁切圓角
const iconSvg =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='#2F6BFF'/>${SHELL_PATHS}</svg>`;
const icon = new Resvg(iconSvg, { fitTo: { mode: 'width', value: 1024 } }).render().asPng();
writeFileSync('resources/icon.png', icon);

// 啟動畫：2732×2732 藍底，貝殼居中
const S = 2732;
const logo = 1100;
const off = (S - logo) / 2;
const k = logo / 64;
const splashSvg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${S}' height='${S}'>` +
  `<rect width='${S}' height='${S}' fill='#2F6BFF'/>` +
  `<g transform='translate(${off} ${off}) scale(${k})'>${SHELL_PATHS}</g></svg>`;
const splash = new Resvg(splashSvg, { fitTo: { mode: 'width', value: S } }).render().asPng();
writeFileSync('resources/splash.png', splash);

console.log('Generated resources/icon.png (1024) and resources/splash.png (2732)');
