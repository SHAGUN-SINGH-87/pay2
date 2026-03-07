import type { CollectionConfig } from 'payload'

export const WorkflowLogs: CollectionConfig = {
  slug: 'workflowLogs',
  access: {
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'workflow', type: 'relationship', relationTo: 'workflows' },
    { name: 'documentId', type: 'text', required: true },
    { name: 'collection', type: 'text', required: true },
    { name: 'step', type: 'text', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'action', type: 'text', required: true },
    { name: 'comment', type: 'textarea' },
    { name: 'timestamp', type: 'date', defaultValue: () => new Date() },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' }, // Reviewer assigned
  ],
}