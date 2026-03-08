import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,

  admin: {
    useAsTitle: "email",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Reviewer", value: "reviewer" },
        { label: "Editor", value: "editor" },
      ],
      required: true,
      defaultValue: "reviewer",
    },
  ],

  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;

      // Admin can see all users
      if (user.role === "admin") return true;

      // Others can only see themselves
      return {
        id: {
          equals: user.id,
        },
      };
    },

    update: ({ req: { user } }) => user?.role === "admin",

    delete: ({ req: { user } }) => user?.role === "admin",

    create: () => true,
  },
};