import type { CollectionConfig } from "payload";

export const WorkflowLogs: CollectionConfig = {
  slug: "workflowLogs",

  admin: {
    useAsTitle: "step",
  },

  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => false,
  },

  fields: [
    {
      name: "workflow",
      type: "relationship",
      relationTo: "workflows",
      required: true,
    },

    {
      name: "documentId",
      type: "text",
      required: true,
    },

    {
      name: "collection",
      type: "text",
      required: true,
    },

    {
      name: "step",
      type: "text",
      required: true,
    },

    {
      name: "action",
      type: "text",
    },

    {
      name: "comment",
      type: "textarea",
    },

    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
    },

    {
      name: "user",
      type: "relationship",
      relationTo: "users",
    },

    {
      name: "timestamp",
      type: "date",
      defaultValue: () => new Date(),
    },
  ],
};