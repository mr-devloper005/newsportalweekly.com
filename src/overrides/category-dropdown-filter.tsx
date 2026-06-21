'use client'

import { useRouter } from 'next/navigation'
import type { TaskKey } from '@/lib/site-config'

type CategoryOption = {
  name: string
  slug: string
}

export function CategoryDropdownFilter({
  task,
  active,
  categories,
}: {
  task: TaskKey
  active: string
  categories: CategoryOption[]
}) {
  const router = useRouter()
  const route = task === 'pdf' ? '/pdf' : '/articles'

  return (
    <select
      value={active}
      onChange={(event) => {
        const value = event.target.value
        router.push(value === 'all' ? route : `${route}?category=${value}`)
      }}
      className="h-11 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0c1726] shadow-sm outline-none hover:border-slate-300 focus:border-[#0c1726]"
      aria-label="Filter by category"
    >
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
