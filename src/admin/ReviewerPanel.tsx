'use client'
import { useEffect, useState } from 'react'

type Task = {
  id: string
  step: string
  action: string
  comment?: string
  timestamp: string
  documentId: string
  collection: string
}

export default function ReviewerPanel({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch(`/api/workflowLogs?where[assignedTo][equals]=${userId}`)
      .then(res => res.json())
      .then(data => setTasks(data.docs))
  }, [userId])

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>My Assigned Tasks</h2>
      {tasks.length === 0 && <p>No tasks assigned to you.</p>}
      {tasks.map(task => (
        <div key={task.id} style={{ marginBottom: '10px' }}>
          <strong>Document: {task.documentId}</strong>
          <p>Step: {task.step}</p>
          <p>Action: {task.action}</p>
          <p>Comment: {task.comment}</p>
          <small>{new Date(task.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  )
}