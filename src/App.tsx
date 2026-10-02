import { useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  SearchBox,
  Text,
  useRestoreFocusTarget,
} from '@fluentui/react-components'
import { Add20Regular } from '@fluentui/react-icons'
import { useAppStyles } from './App.styles'
import { AppHeader, type AppView } from './components/AppHeader'
import { ApplicationsPage } from './components/ApplicationsPage'
import { CreateApplicationDialog } from './components/CreateApplicationDialog'
import { FilterSelect } from './components/FilterSelect'
import { ResourceMetrics } from './components/ResourceMetrics'
import { ResourceTable } from './components/ResourceTable'
import { resources } from './data'
import type {
  Application,
  Criticality,
  Environment,
  Provider,
  ResourceFilters,
} from './types'

const STORAGE_KEY = 'gambit-applications'
const PROVIDER_OPTIONS = ['AWS', 'GCP', 'Azure'] as const
const ENVIRONMENT_OPTIONS = ['production', 'staging', 'development'] as const
const CRITICALITY_OPTIONS = ['critical', 'high', 'medium', 'low'] as const
const PROVIDER_COUNT = new Set(resources.map(({ provider }) => provider)).size
const RESOURCE_OVERVIEW = resources.reduce(
  (overview, resource) => {
    overview.totalOpenIssues += resource.openIssues
    if (resource.environment === 'production') overview.productionCount += 1
    if (resource.criticality === 'critical') overview.criticalCount += 1
    return overview
  },
  {
    totalOpenIssues: 0,
    productionCount: 0,
    criticalCount: 0,
  },
)
const initialFilters: ResourceFilters = {
  provider: 'all',
  environment: 'all',
  criticality: 'all',
}


const loadApplications = (): Application[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? (parsed as Application[]) : []
  } catch {
    return []
  }
}

const App = () => {
  const styles = useAppStyles()
  const restoreFocusTargetAttributes = useRestoreFocusTarget()
  const [activeView, setActiveView] = useState<AppView>('resources')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<ResourceFilters>(initialFilters)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [applications, setApplications] = useState<Application[]>(loadApplications)
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createDialogSession, setCreateDialogSession] = useState(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  const filteredResources = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return resources.filter((resource) => {
      const matchesSearch =
        !normalizedSearch || resource.name.toLowerCase().includes(normalizedSearch)
      return (
        matchesSearch &&
        (filters.provider === 'all' || resource.provider === filters.provider) &&
        (filters.environment === 'all' || resource.environment === filters.environment) &&
        (filters.criticality === 'all' || resource.criticality === filters.criticality)
      )
    })
  }, [filters, search])

  const selectedResources = useMemo(
    () => resources.filter(({ id }) => selectedIds.has(id)),
    [selectedIds],
  )
  const activeApplication =
    applications.find(({ id }) => id === activeApplicationId) ?? applications[0]
  const activeApplicationResources = useMemo(() => {
    if (!activeApplication) return []
    const resourceIds = new Set(activeApplication.resourceIds)
    return resources.filter(({ id }) => resourceIds.has(id))
  }, [activeApplication])
  const activeApplicationStats = useMemo(
    () => ({
      providerCount: new Set(
        activeApplicationResources.map(({ provider }) => provider),
      ).size,
      openIssues: activeApplicationResources.reduce(
        (sum, resource) => sum + resource.openIssues,
        0,
      ),
    }),
    [activeApplicationResources],
  )

  const updateFilter = <Key extends keyof ResourceFilters,>(
    key: Key,
    value: ResourceFilters[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const toggleResource = (resourceId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(resourceId)) next.delete(resourceId)
      else next.add(resourceId)
      return next
    })
  }

  const toggleAllVisible = () => {
    setSelectedIds((current) => {
      const next = new Set(current)
      const areAllSelected = filteredResources.every(({ id }) => next.has(id))
      filteredResources.forEach(({ id }) => {
        if (areAllSelected) next.delete(id)
        else next.add(id)
      })
      return next
    })
  }

  const openCreateDialog = () => {
    setCreateDialogSession((current) => current + 1)
    setIsCreateOpen(true)
  }

  const createApplication = (name: string, description: string) => {
    const application: Application = {
      id: crypto.randomUUID(),
      name,
      description: description || undefined,
      resourceIds: [...selectedIds],
      createdAt: new Date().toISOString(),
    }
    setApplications((current) => [...current, application])
    setActiveApplicationId(application.id)
    setSelectedIds(new Set())
    setIsCreateOpen(false)
    setActiveView('applications')
  }

  const deleteApplication = (applicationId: string) => {
    setApplications((current) => current.filter(({ id }) => id !== applicationId))
    setActiveApplicationId(null)
  }

  const hasFilters =
    search.trim().length > 0 ||
    filters.provider !== 'all' ||
    filters.environment !== 'all' ||
    filters.criticality !== 'all'

  return (
    <div className={styles.shell}>
      <AppHeader
        activeView={activeView}
        applicationCount={applications.length}
        onViewChange={setActiveView}
      />

      <main>
        {activeView === 'resources' ? (
          <div className={styles.page}>
            <section className={styles.pageHeading}>
              <div>
                <Text as="span" className={styles.eyebrow}>Cloud inventory</Text>
                <Text as="h1" block className={styles.pageTitle}>Resources</Text>
                <Text as="p" block className={styles.description}>
                  Monitor and organize cloud resources across your environment.
                </Text>
              </div>
              <Button
                {...restoreFocusTargetAttributes}
                className={styles.primaryAction}
                appearance="primary"
                icon={<Add20Regular />}
                disabled={selectedIds.size === 0}
                onClick={openCreateDialog}
              >
                Create application
              </Button>
            </section>

            <ResourceMetrics
              totalResources={resources.length}
              productionCount={RESOURCE_OVERVIEW.productionCount}
              criticalCount={RESOURCE_OVERVIEW.criticalCount}
              totalOpenIssues={RESOURCE_OVERVIEW.totalOpenIssues}
              providerCount={PROVIDER_COUNT}
            />

            <Card className={styles.contentCard}>
              <div className={styles.cardHeading}>
                <Text as="h2" block>All resources</Text>
                <Text as="p" block>
                  {filteredResources.length} of {resources.length} resources
                </Text>
              </div>

              <div className={styles.toolbar}>
                <SearchBox
                  className={styles.search}
                  appearance="outline"
                  value={search}
                  onChange={(_, data) => setSearch(data.value)}
                  placeholder="Search by resource name..."
                  aria-label="Search resources by name"
                />
                <div className={styles.filterGroup}>
                  <FilterSelect
                    label="Provider"
                    value={filters.provider}
                    onChange={(value) => updateFilter('provider', value as Provider | 'all')}
                    options={PROVIDER_OPTIONS}
                  />
                  <FilterSelect
                    label="Environment"
                    value={filters.environment}
                    onChange={(value) =>
                      updateFilter('environment', value as Environment | 'all')
                    }
                    options={ENVIRONMENT_OPTIONS}
                  />
                  <FilterSelect
                    label="Criticality"
                    value={filters.criticality}
                    onChange={(value) =>
                      updateFilter('criticality', value as Criticality | 'all')
                    }
                    options={CRITICALITY_OPTIONS}
                  />
                  {hasFilters && (
                    <Button
                      appearance="subtle"
                      size="small"
                      onClick={() => {
                        setSearch('')
                        setFilters(initialFilters)
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>

              {selectedIds.size > 0 && (
                <div className={styles.selectionBar} role="status">
                  <div className={styles.selectionSummary}>
                    <Badge appearance="filled" color="brand" shape="circular">
                      {selectedIds.size}
                    </Badge>
                    <Text as="strong" weight="semibold">
                      {selectedIds.size === 1 ? 'resource selected' : 'resources selected'}
                    </Text>
                    <Button
                      appearance="transparent"
                      size="small"
                      onClick={() => setSelectedIds(new Set())}
                    >
                      Clear selection
                    </Button>
                  </div>
                  <Button
                    {...restoreFocusTargetAttributes}
                    appearance="primary"
                    size="small"
                    onClick={openCreateDialog}
                  >
                    Group into application
                  </Button>
                </div>
              )}

              <ResourceTable
                resources={filteredResources}
                selectedIds={selectedIds}
                onToggle={toggleResource}
                onToggleAll={toggleAllVisible}
              />
            </Card>
          </div>
        ) : (
          <ApplicationsPage
            applications={applications}
            activeApplication={activeApplication}
            activeApplicationResources={activeApplicationResources}
            activeApplicationStats={activeApplicationStats}
            onNewApplication={() => setActiveView('resources')}
            onSelectApplication={setActiveApplicationId}
            onDeleteApplication={deleteApplication}
          />
        )}
      </main>

      <CreateApplicationDialog
        key={createDialogSession}
        open={isCreateOpen}
        selectedResources={selectedResources}
        onClose={() => setIsCreateOpen(false)}
        onCreate={createApplication}
      />
    </div>
  )
}

export default App
