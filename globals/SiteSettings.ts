import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website Instellingen',
  admin: {
    description: 'Algemene instellingen: contactgegevens, social media, footer en navigatie.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Algemeen',
          fields: [
            { name: 'siteName', type: 'text', label: 'Website naam', defaultValue: 'RENT HARDER' },
            { name: 'siteDescription', type: 'textarea', label: 'Website beschrijving', defaultValue: 'De digitale sidekick achter jouw verhuur.' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', label: 'Telefoonnummer' },
            { name: 'email', type: 'text', label: 'E-mail' },
            { name: 'whatsapp', type: 'text', label: 'WhatsApp nummer' },
            { name: 'address', type: 'textarea', label: 'Adres' },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
            { name: 'instagram', type: 'text', label: 'Instagram URL' },
            { name: 'facebook', type: 'text', label: 'Facebook URL' },
            { name: 'youtube', type: 'text', label: 'YouTube URL' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTagline', type: 'text', label: 'Tagline', defaultValue: 'De digitale sidekick achter jouw verhuur.' },
            { name: 'footerDescription', type: 'text', label: 'Beschrijving', defaultValue: 'Jij verhuurt het materieel.' },
            { name: 'footerDescriptionBold', type: 'text', label: 'Beschrijving (vet)', defaultValue: 'Wij bouwen en ontwikkelen jouw complete digitale verhuurtak.' },
            { name: 'poweredBy', type: 'text', label: 'Powered by', defaultValue: 'Powered by KIX.' },
            { name: 'builtBy', type: 'text', label: 'Built by', defaultValue: 'Software built by Fuse-IT.' },
          ],
        },
        {
          label: 'Navigatie',
          description: 'Menu items — sleep om te herordenen.',
          fields: [
            {
              name: 'navigation',
              type: 'array',
              label: 'Menu items',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '35%' } },
                    { name: 'href', type: 'text', required: true, label: 'Link', admin: { width: '35%' } },
                    {
                      name: 'type',
                      type: 'select',
                      label: 'Type',
                      options: [
                        { label: 'Pagina', value: 'page' },
                        { label: 'Anchor', value: 'anchor' },
                        { label: 'Contact popup', value: 'contact' },
                      ],
                      defaultValue: 'page',
                      admin: { width: '30%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
