import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Beheer wie toegang heeft tot het CMS.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Volledige naam',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      options: [
        { label: 'Beheerder', value: 'admin' },
        { label: 'Redacteur', value: 'editor' },
      ],
      defaultValue: 'editor',
      admin: { position: 'sidebar' },
    },
  ],
}
