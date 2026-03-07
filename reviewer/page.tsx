import config from '@payload-config'; // adjust path if needed
import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import ReviewerPanel from 'src/admin/ReviewerPanel';

export default async function ReviewerPage() {
  
  const nextHeaders = await getHeaders() 
  const headers = new Headers()
  for (const [key, value] of nextHeaders.entries()) {
    headers.append(key, value)
  }

  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  if (!user) {
    return <p>Please login to view your tasks</p>
  }

  if (user.role !== 'reviewer') {
    return <p>Access denied: only reviewers can view this page</p>
  }

  return <ReviewerPanel userId={user.id} />
}