import { ResourceCard, ResourceCardProps } from './resource-card'

interface ResourceListProps {
  resources: ResourceCardProps[]
  emptyMessage?: string
}

export function ResourceList({ resources, emptyMessage = "No resources available." }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <ResourceCard key={index} {...resource} />
      ))}
    </div>
  )
}