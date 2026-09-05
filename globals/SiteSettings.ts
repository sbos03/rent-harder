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
          description: 'Teksten, navigatiekolommen en juridische links in de footer.',
          fields: [
            { name: 'footerTagline', type: 'text', label: 'Tagline', defaultValue: 'De digitale sidekick achter jouw verhuur.' },
            { name: 'footerBrandLine1', type: 'text', label: 'Merktekst regel 1', defaultValue: 'Jij verhuurt het materieel.' },
            { name: 'footerBrandLine2', type: 'text', label: 'Merktekst regel 2 (vet)', defaultValue: 'Wij bouwen de digitale verhuurtak erachter.' },
            { name: 'footerSocialsTitle', type: 'text', label: 'Socials titel', defaultValue: 'Volg Rent Harder.' },
            { name: 'footerCopyright', type: 'text', label: 'Copyright tekst', defaultValue: '© 2026 RENT HARDER.' },
            {
              name: 'footerColumns',
              type: 'array',
              label: 'Navigatiekolommen',
              admin: { description: 'Kolommen met links onderaan de footer (bijv. "Ontdek", "Contact").' },
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Kolomtitel' },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Links',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '50%' } },
                        { name: 'href', type: 'text', label: 'Link (leeg = geen link)', admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'legalLinks',
              type: 'array',
              label: 'Juridische links',
              admin: { description: 'Links naast het copyright (bijv. Privacy, Voorwaarden).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '50%' } },
                    { name: 'href', type: 'text', required: true, label: 'Link', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Navigatie',
          description: 'Hoofdmenu items — sleep om te herordenen. Voeg submenu-items toe voor een uitklapbaar menu.',
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
                    { name: 'href', type: 'text', label: 'Link', admin: { width: '35%' } },
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
                {
                  name: 'children',
                  type: 'array',
                  label: 'Submenu items',
                  admin: { description: 'Optioneel. Als je hier items toevoegt, wordt dit menu-item uitklapbaar (+ / −).' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, label: 'Label', admin: { width: '50%' } },
                        { name: 'href', type: 'text', required: true, label: 'Link', admin: { width: '50%' } },
                      ],
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
