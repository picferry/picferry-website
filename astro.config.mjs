// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const sidebar = [
	{
		label: '开始',
		translations: { en: 'Start' },
		items: [
			{ label: '简介', translations: { en: 'Overview' }, slug: 'getting-started' },
				{ label: '功能与发布状态', translations: { en: 'Features & releases' }, slug: 'status' },
		],
	},
	{
		label: '安装',
		translations: { en: 'Install' },
		items: [
			{ label: '下载', translations: { en: 'Download' }, slug: 'download' },
			{ label: '安装说明', translations: { en: 'Install' }, slug: 'install' },
		],
	},
	{
		label: '使用指南',
		translations: { en: 'Guides' },
		items: [
			{ label: 'iCloud', slug: 'guides/icloud' },
			{ label: 'HUAWEI', slug: 'guides/huawei' },
			{ label: 'Xiaomi', slug: 'guides/xiaomi' },
			{ label: 'vivo', slug: 'guides/vivo' },
			{ label: 'OPPO', slug: 'guides/oppo' },
			{ label: 'HONOR', slug: 'guides/honor' },
			{ label: '图形界面', translations: { en: 'GUI' }, slug: 'guides/gui' },
		],
	},
	{
		label: '项目',
		translations: { en: 'Project' },
		items: [
			{ label: '安全', translations: { en: 'Security' }, slug: 'security' },
			{ label: '架构', translations: { en: 'Architecture' }, slug: 'architecture' },
			{ label: '贡献', translations: { en: 'Contributing' }, slug: 'contributing' },
		],
	},
];

export default defineConfig({
	site: 'https://picferry.jqknono.com',
	integrations: [
		starlight({
			logo: {
				src: './public/favicon.svg',
				alt: '',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			title: {
				'zh-CN': 'PicFerry',
				en: 'PicFerry',
			},
			description: '非官方云相册工具：连接 iCloud、小米和 vivo，浏览照片与视频，保存到本地目录或手机系统图库。',
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/picferry/picferry-website',
				},
			],
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			sidebar,
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#0F172A',
					},
				},
			],
		}),
	],
});
