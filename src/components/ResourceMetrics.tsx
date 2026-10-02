import { useAppStyles } from '../App.styles'
import { MetricCard } from './MetricCard'

interface ResourceMetricsProps {
  totalResources: number
  productionCount: number
  criticalCount: number
  totalOpenIssues: number
  providerCount: number
}

export const ResourceMetrics = ({
  totalResources,
  productionCount,
  criticalCount,
  totalOpenIssues,
  providerCount,
}: ResourceMetricsProps) => {
  const styles = useAppStyles()

  return (
    <section className={styles.metricsGrid} aria-label="Resource overview">
      <MetricCard
        label="Total resources"
        value={totalResources}
        detail={`Across ${providerCount} providers`}
        icon="stack"
      />
      <MetricCard
        label="Production"
        value={productionCount}
        detail="Active workloads"
        icon="bolt"
      />
      <MetricCard
        label="Critical assets"
        value={criticalCount}
        detail="Require close monitoring"
        icon="shield"
      />
      <MetricCard
        label="Open issues"
        value={totalOpenIssues}
        detail="Across all resources"
        icon="alert"
        danger
      />
    </section>
  )
}
