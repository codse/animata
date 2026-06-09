import { ResourceGridItem } from "@/components/resources/resource-grid-item";
import type { Resource } from "@/lib/resources";

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceGridItem key={resource.id} resource={resource} />
      ))}
    </ul>
  );
}
