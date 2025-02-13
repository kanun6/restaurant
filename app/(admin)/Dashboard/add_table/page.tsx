import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'

export default async function AdminAddtable() {
  // Protect the page from users who are not admins
  const isAdmin = await checkRole('marketing_admin')
  if (!isAdmin) {
    redirect('/')
  }

  return <div>
    <h1>addtable</h1>
  </div>
}