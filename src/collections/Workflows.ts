import type { CollectionConfig } from 'payload'

export const Workflows: CollectionConfig = {

  slug: 'workflows',

  admin: {
    useAsTitle: 'name',
  },

  fields: [

    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'targetCollection',
      type: 'text',
      required: true,
    },

    {
      name: 'steps',
      type: 'array',

      fields: [

        {
          name: 'stepName',
          type: 'text',
        },

        {
          name: 'stepType',
          type: 'select',

          options: [
            'approval',
            'review',
            'sign-off',
            'comment-only'
          ],
        },

        {
          name: 'assignedRole',
          type: 'text',
        },

        {
          name: 'condition',
          type: 'text',
        },

        {
          name: 'slaHours',
          type: 'number',
        }

      ],
    }

  ],
}