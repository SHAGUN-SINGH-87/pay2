import type { CollectionConfig } from 'payload'

export const WorkflowLogs: CollectionConfig = {
  slug: 'workflowLogs',

  access: {
    create: () => false, 
    read: () => true,    
    update: () => false,
    delete: () => false,
  },

  fields: [
    { name: 'workflow', type: 'relationship', relationTo: 'workflows', required: true },
    { name: 'documentId', type: 'text', required: true },
    { name: 'collection', type: 'text', required: true },
    { name: 'step', type: 'text', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users' }, // Who performed action
    { name: 'action', type: 'text', required: true },
    { name: 'comment', type: 'textarea' },
    { name: 'timestamp', type: 'date', defaultValue: () => new Date() },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' }, // Reviewer assigned
  ],
}