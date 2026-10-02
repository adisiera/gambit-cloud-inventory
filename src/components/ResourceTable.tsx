import {
  Badge,
  Checkbox,
  mergeClasses,
} from '@fluentui/react-components'
import { Cloud16Regular, Search24Regular } from '@fluentui/react-icons'
import { useResourceTableStyles } from '../styles/ResourceTable.styles'
import type { Resource } from '../types'

interface ResourceTableProps {
  resources: Resource[]
  selectedIds: Set<string>
  onToggle: (resourceId: string) => void
  onToggleAll: () => void
}


export const ResourceTable = ({
  resources,
  selectedIds,
  onToggle,
  onToggleAll,
}: ResourceTableProps) => {
  const styles = useResourceTableStyles()
  const allVisibleSelected =
    resources.length > 0 && resources.every(({ id }) => selectedIds.has(id))
  const someVisibleSelected =
    !allVisibleSelected && resources.some(({ id }) => selectedIds.has(id))
  const providerStyles: Record<Resource['provider'], string> = {
    AWS: styles.aws,
    GCP: styles.gcp,
    Azure: styles.azure,
  }
  const providerIconStyles: Record<Resource['provider'], string> = {
    AWS: styles.awsIcon,
    GCP: styles.gcpIcon,
    Azure: styles.azureIcon,
  }
  const environmentStyles: Record<Resource['environment'], string> = {
    production: styles.production,
    staging: styles.staging,
    development: styles.development,
  }
  const criticalityStyles: Record<Resource['criticality'], string> = {
    critical: styles.critical,
    high: styles.high,
    medium: styles.medium,
    low: styles.low,
  }

  if (resources.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon} aria-hidden="true">
          <Search24Regular />
        </div>
        <h3>No resources found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.selectColumn}>
              <Checkbox
                aria-label="Select all visible resources"
                checked={someVisibleSelected ? 'mixed' : allVisibleSelected}
                onChange={onToggleAll}
              />
            </th>
            <th>Resource</th>
            <th>Provider</th>
            <th>Environment</th>
            <th>Criticality</th>
            <th className={styles.issuesColumn}>Open issues</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr
              key={resource.id}
              className={mergeClasses(
                selectedIds.has(resource.id) && styles.selectedRow,
              )}
            >
              <td className={styles.selectColumn}>
                <Checkbox
                  aria-label={`Select ${resource.name}`}
                  checked={selectedIds.has(resource.id)}
                  onChange={() => onToggle(resource.id)}
                />
              </td>
              <td>
                <div className={styles.resourceCell}>
                  <div
                    className={mergeClasses(
                      styles.providerMark,
                      providerStyles[resource.provider],
                    )}
                    aria-hidden="true"
                  >
                    {resource.provider.slice(0, 1)}
                  </div>
                  <div>
                    <strong>{resource.name}</strong>
                    <span>
                      {resource.type} · {resource.region}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className={styles.providerLabel}>
                  <Cloud16Regular
                    className={mergeClasses(
                      styles.providerIcon,
                      providerIconStyles[resource.provider],
                    )}
                    aria-hidden="true"
                  />
                  {resource.provider}
                </span>
              </td>
              <td>
                <Badge
                  className={mergeClasses(
                    styles.environment,
                    environmentStyles[resource.environment],
                  )}
                  appearance="tint"
                >
                  {resource.environment}
                </Badge>
              </td>
              <td>
                <span className={styles.criticality}>
                  <span
                    className={mergeClasses(
                      styles.criticalityDot,
                      criticalityStyles[resource.criticality],
                    )}
                    aria-hidden="true"
                  />
                  {resource.criticality}
                </span>
              </td>
              <td className={styles.issuesColumn}>
                <Badge
                  appearance="tint"
                  color={resource.openIssues > 0 ? 'danger' : 'informative'}
                >
                  {resource.openIssues}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
