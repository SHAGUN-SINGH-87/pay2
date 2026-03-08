import { Payload } from "payload";

export default async function triggerWorkflow({
  doc,
  previousDoc,
  req,
  operation,
}: {
  doc: any;
  previousDoc: any;
  req: any;
  operation: "create" | "update";
}) {
  try {
    const payload: Payload = req.payload;

    // Ensure workflow exists
    if (!doc.workflow) return;

    const workflow = await payload.findByID({
      collection: "workflows",
      id: doc.workflow,
    });

    if (!workflow?.steps?.length) return;

    let nextStep;

    // -------- START WORKFLOW --------
    if (operation === "create") {
      nextStep = workflow.steps[0];

      await payload.update({
        collection: "blogs",
        id: doc.id,
        data: {
          currentStep: nextStep.stepName,
          status: "review",
        },
      });
    }

    // -------- MOVE TO NEXT STEP --------
    if (operation === "update") {
      const currentIndex = workflow.steps.findIndex(
        (step: any) => step.stepName === doc.currentStep
      );

      if (currentIndex === -1) return;

      nextStep = workflow.steps[currentIndex + 1];

      if (nextStep) {
        await payload.update({
          collection: "blogs",
          id: doc.id,
          data: {
            currentStep: nextStep.stepName,
          },
        });
      } else {
        // Workflow finished
        await payload.update({
          collection: "blogs",
          id: doc.id,
          data: {
            currentStep: "Completed",
            status: "approved",
          },
        });
      }
    }

    // -------- CREATE LOG --------
    await payload.create({
      collection: "workflowLogs",
      data: {
        workflow: doc.workflow,
        documentId: doc.blogId,
        collection: "blogs",
        step: nextStep?.stepName || doc.currentStep,
        action: doc.status || "updated",
        comment: "",
        assignedTo: doc.assignedReviewer || null,
        user: req?.user?.id || null,
        timestamp: new Date().toISOString(),
      },
    });

    console.log("Workflow log created for:", doc.blogId);
  } catch (err) {
    console.error("Workflow trigger error:", err);
  }
}