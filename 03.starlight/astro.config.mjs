// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Docs Test',
			social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
        { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com' }
      ],
			sidebar: [
        {
          label: 'Quick Start',
          autogenerate: { directory: 'quick_start'}
        },
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
      credits: true
		}),
	],
});
