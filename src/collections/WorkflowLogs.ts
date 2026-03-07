import type { CollectionConfig } from 'payload'

export const WorkflowLogs: CollectionConfig = {
  slug: 'workflowLogs',

  access: {
    update: () => false,
    delete: () => false,
  },

  fields: [
    {
      name: 'workflow',
      type: 'relationship',
      relationTo: 'workflows' as any,
    },

    {
      name: 'documentId',
      type: 'text',
    },

    {
      name: 'collection',
      type: 'text',
    },

    {
      name: 'step',
      type: 'text',
    },

    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users' as any,
    },

    {
      name: 'action',
      type: 'text',
    },

    {
      name: 'comment',
      type: 'textarea',
    },

    {
      name: 'timestamp',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}