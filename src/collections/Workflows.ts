import type { CollectionConfig } from "payload";

export const Workflows: CollectionConfig = {
  slug: "workflows",

  admin: {
    useAsTitle: "name",
  },

  access: {
    read: ({ req: { user } }) => user?.role === "admin",
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },

    {
      name: "targetCollection",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Blogs", value: "blogs" },
        { label: "Contracts", value: "contracts" },
      ],
    },

    {
      name: "steps",
      type: "array",

      fields: [
        {
          name: "stepName",
          type: "text",
          required: true,
        },

        {
          name: "stepType",
          type: "select",
          required: true,
          options: [
            { label: "Approval", value: "approval" },
            { label: "Review", value: "review" },
            { label: "Sign Off", value: "sign-off" },
            { label: "Comment Only", value: "comment-only" },
          ],
        },

        {
          name: "assignedRole",
          type: "select",
          required: true,
          options: [
            { label: "Admin", value: "admin" },
            { label: "Reviewer", value: "reviewer" },
            { label: "Editor", value: "editor" },
          ],
        },

        {
          name: "condition",
          type: "text",
          admin: {
            description: "Example: amount > 10000",
          },
        },

        {
          name: "slaHours",
          type: "number",
          admin: {
            description: "SLA time for this step in hours",
          },
        },
      ],
    },
  ],
};