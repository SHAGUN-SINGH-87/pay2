import type { CollectionConfig } from "payload";
import triggerWorkflow from "../hooks/triggerWorkflow";

export const Blogs: CollectionConfig = {
  slug: "blogs",

  admin: {
    useAsTitle: "title",
  },

  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;

      // Admin sees everything
      if (user.role === "admin") return true;

      // Reviewer only sees assigned blogs
      if (user.role === "reviewer") {
        return {
          assignedReviewer: {
            equals: user.id,
          },
        };
      }

      return false;
    },

    update: ({ req: { user } }) =>
      user?.role === "admin" || user?.role === "reviewer",

    create: ({ req: { user } }) => user?.role === "admin",

    delete: ({ req: { user } }) => user?.role === "admin",
  },

  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === "create" && !data.blogId) {
          data.blogId = `BLOG-${Date.now()}`;
        }
        return data;
      },
    ],

    afterChange: [triggerWorkflow],
  },

  fields: [
    {
      name: "blogId",
      type: "text",
      label: "Blog ID",
      unique: true,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },

    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "content",
      type: "richText",
    },

    {
      name: "amount",
      type: "number",
    },

    {
      name: "workflow",
      type: "relationship",
      relationTo: "workflows",
      admin: {
        description: "Select the workflow for this blog",
      },
    },

    {
      name: "currentStep",
      type: "text",
      admin: {
        readOnly: true,
        description: "Current workflow step",
      },
    },

    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "In Review", value: "review" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "draft",
    },

    {
      name: "assignedReviewer",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "Assign a reviewer for this blog",
      },
    },
  ],
};

export default Blogs;