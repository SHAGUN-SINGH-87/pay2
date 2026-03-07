import type { CollectionConfig } from 'payload'

export const Workflows: CollectionConfig = {
  slug: 'workflows',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'targetCollection', type: 'text', required: true }, // e.g., 'blogs'
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'stepName', type: 'text', required: true },
        {
          name: 'stepType',
          type: 'select',
          options: ['approval', 'review', 'sign-off', 'comment-only'],
          required: true,
        },
        {
          name: 'assignedRole',
          type: 'select',
          options: ['admin', 'reviewer', 'editor'],
          required: true,
        },
        { name: 'condition', type: 'text' },
        { name: 'slaHours', type: 'number' },
      ],
    },
  ],
}