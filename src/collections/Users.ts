import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Payload will automatically add email/password fields
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'reviewer', 'editor'],
      required: true,
      defaultValue: 'reviewer',
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' ? true : { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}