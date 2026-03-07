// src/hooks/triggerWorkflow.ts
import { Payload } from "payload"

export default async function triggerWorkflow(args: {
  doc: any
  previousDoc: any
  req: any // PayloadRequest type
}) {
  const { doc, req } = args
  const payload: Payload = req.payload

  if (!doc.workflow) return

  // Get workflow configuration
  const workflow = await payload.findByID({
    collection: "workflows",
    id: doc.workflow,
  })

  if (!workflow?.steps || workflow.steps.length === 0) return

  // Determine current step index
  const currentStepIndex = workflow.steps.findIndex(
    (s: any) => s.stepName === doc.currentStep
  )

  // Determine next step
  let nextStep = workflow.steps[0] // default first step
  if (currentStepIndex >= 0 && currentStepIndex < workflow.steps.length - 1) {
    nextStep = workflow.steps[currentStepIndex + 1]
  }

  // Update the blog's current step
  await payload.update({
    collection: "blogs",
    id: doc.id,
    data: {
      currentStep: nextStep.stepName,
    },
  })

  // Log the workflow action
  await payload.create({
    collection: "workflowLogs",
    data: {
      workflow: doc.workflow,
      documentId: doc.id,
      collection: "blogs",
      step: nextStep.stepName,
      user: req?.user?.id || null,
      action: doc.status || "updated",
      comment: doc.comment || "",
      assignedTo: doc.assignedReviewer || null,
      timestamp: new Date().toISOString(), // ISO string
    },
  })
}