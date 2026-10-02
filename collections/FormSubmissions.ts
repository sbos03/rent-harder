import type { CollectionConfig } from 'payload'

/**
 * Contact form submissions from the site (the "Stuur een mail" and
 * "Plan een kennismaking" flows). Saved here as the source of truth so no lead
 * is ever lost, even if email delivery is down or not yet configured.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Aanvraag',
    plural: 'Aanvragen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'type', 'createdAt'],
    description: 'Berichten die via het contactformulier op de site zijn verstuurd.',
    group: 'Formulieren',
  },
  access: {
    // The public API route creates entries via Local API (overrides access),
    // but keep create closed to unauthenticated REST just in case.
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      defaultValue: 'mail',
      options: [
        { label: 'Mail / algemeen', value: 'mail' },
        { label: 'Kennismaking plannen', value: 'kennismaking' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Afgehandeld',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Vink aan zodra je hebt gereageerd.' },
    },
    { name: 'name', type: 'text', label: 'Naam', required: true },
    { name: 'email', type: 'email', label: 'E-mail', required: true },
    { name: 'phone', type: 'text', label: 'Telefoon' },
    {
      name: 'preferredDate',
      type: 'text',
      label: 'Voorkeursdatum/-tijd',
      admin: { description: 'Alleen relevant bij een kennismaking.' },
    },
    { name: 'message', type: 'textarea', label: 'Bericht' },
    // Light context, handy for triage / spam checks.
    { name: 'pagePath', type: 'text', label: 'Pagina', admin: { readOnly: true } },
  ],
}
