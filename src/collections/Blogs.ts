import type { CollectionConfig } from "payload";
import triggerWorkflow from "../hooks/triggerWorkflow";

const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [triggerWorkflow],
  },
  fields: [
    {
      name: "id",
      type: "text",
      label: "Blog ID",
      admin: {
        readOnly: true, // cannot be edited
        position: "sidebar", // optional, shows in the sidebar
      },
      defaultValue: ({ doc }) => doc.id || "", // automatically populate
    },
    { name: "title", type: "text", required: true },
    { name: "content", type: "richText" },
    { name: "amount", type: "number" },
    {
      name: "workflow",
      type: "relationship",
      relationTo: "workflows",
    },
    {
      name: "currentStep",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      options: ["draft", "review", "approved", "rejected"],
      defaultValue: "draft",
    },
    {
      name: "assignedReviewer",
      type: "relationship",
      relationTo: "users",
      admin: { description: "Assign a reviewer for this blog" },
    },
  ],
};

export default Blogs;