import type { CollectionConfig } from "payload";
import triggerWorkflow from "../hooks/triggerWorkflow";

const Blogs: CollectionConfig = {

  slug: "blogs",

  hooks: {
    afterChange: [triggerWorkflow]
  },

  fields: [

    {
      name: "title",
      type: "text"
    },

    {
      name: "content",
      type: "textarea"
    },

    {
      name: "amount",
      type: "number"
    }

  ]
};

export default Blogs;