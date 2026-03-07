import payload from "payload";

interface Doc {
  id: string;
}

interface Collection {
  slug: string;
}

interface TriggerWorkflowArgs {
  doc: Doc;
  collection: Collection;
}

const triggerWorkflow = async ({ doc, collection }: TriggerWorkflowArgs) => {
  const workflows = await payload.find({
    collection: "workflows" as any, // workaround for Payload type union
    where: {
      targetCollection: {
        equals: collection.slug,
      },
    },
  });

  if (!workflows.docs.length) return;

  const workflow: any = workflows.docs[0];
  const step: any = workflow.steps?.[0];

  if (!step) return;

  await payload.create({
    collection: "workflowLogs" as any,
    data: {
      workflowId: workflow.id,
      collection: collection.slug,
      documentId: doc.id,
      stepId: step.id,
      action: "created",
    },
  });

  console.log("Workflow step triggered");
};

export default triggerWorkflow;