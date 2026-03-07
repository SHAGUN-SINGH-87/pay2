import { useEffect, useState } from "react";

interface Log {
  id: string;
  action: string;
  timestamp: string;
}

interface WorkflowTabProps {
  docId: string;
}

const WorkflowTab = ({ docId }: WorkflowTabProps) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/workflows/status/${docId}`);
        const data = await res.json();
        setLogs(data.docs || []);
      } catch (error) {
        console.error("Error fetching workflow logs:", error);
      }
    };

    fetchLogs();
  }, [docId]);

  return (
    <div>
      <h3>Workflow Progress</h3>
      {logs.map((log) => (
        <div key={log.id}>
          <p>{log.action}</p>
          <p>{log.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkflowTab;