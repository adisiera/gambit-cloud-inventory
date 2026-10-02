import { lazy, Suspense } from 'react'
import {
  Badge,
  Button,
  Card,
  Spinner,
  Text,
  mergeClasses,
} from '@fluentui/react-components'
import {
  Add20Regular,
  Apps24Regular,
  Delete20Regular,
} from '@fluentui/react-icons'
import { useAppStyles } from '../App.styles'
import type { Application, Resource } from '../types'

interface ApplicationsPageProps {
  applications: Application[]
  activeApplication?: Application
  activeApplicationResources: Resource[]
  activeApplicationStats: {
    providerCount: number
    openIssues: number
  }
  onNewApplication: () => void
  onSelectApplication: (applicationId: string) => void
  onDeleteApplication: (applicationId: string) => void
}

const createdDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const ApplicationGraph = lazy(() =>
  import('./ApplicationGraph').then(({ ApplicationGraph: Graph }) => ({
    default: Graph,
  })),
)

export const ApplicationsPage = ({
  applications,
  activeApplication,
  activeApplicationResources,
  activeApplicationStats,
  onNewApplication,
  onSelectApplication,
  onDeleteApplication,
}: ApplicationsPageProps) => {
  const styles = useAppStyles()

  return (
    <div className={styles.page}>
      <section className={styles.pageHeading}>
        <div>
          <Text as="span" className={styles.eyebrow}>Resource groups</Text>
          <Text as="h1" block className={styles.pageTitle}>Applications</Text>
          <Text as="p" block className={styles.description}>
            Understand the resources that power each application.
          </Text>
        </div>
        <Button
          appearance="secondary"
          icon={<Add20Regular />}
          onClick={onNewApplication}
        >
          New application
        </Button>
      </section>

      {applications.length === 0 ? (
        <Card className={mergeClasses(styles.contentCard, styles.applicationsEmpty)}>
          <div className={styles.emptyGraphic} aria-hidden="true">
            <Apps24Regular />
          </div>
          <Text as="h2" block>No applications yet</Text>
          <Text as="p" block>
            Select resources from your inventory and group them into an application.
          </Text>
          <Button appearance="primary" onClick={onNewApplication}>
            Browse resources
          </Button>
        </Card>
      ) : (
        <div className={styles.applicationsLayout}>
          <Card className={mergeClasses(styles.contentCard, styles.applicationList)}>
            <div className={styles.applicationListHeading}>
              <Text as="h2" block>Applications</Text>
              <Badge appearance="tint">{applications.length}</Badge>
            </div>
            {applications.map((application) => (
              <Button
                key={application.id}
                appearance="subtle"
                icon={<Apps24Regular />}
                className={mergeClasses(
                  styles.applicationListItem,
                  activeApplication?.id === application.id && styles.activeApplication,
                )}
                onClick={() => onSelectApplication(application.id)}
                aria-pressed={activeApplication?.id === application.id}
              >
                <span className={styles.applicationItemContent}>
                  <Text as="strong" weight="semibold">{application.name}</Text>
                  <Text as="span" size={100}>
                    {application.resourceIds.length} resources
                  </Text>
                </span>
              </Button>
            ))}
          </Card>

          {activeApplication && (
            <Card className={styles.applicationDetail}>
              <div className={styles.detailHeader}>
                <div className={styles.applicationTitle}>
                  <span className={styles.applicationHeroIcon} aria-hidden="true">
                    <Apps24Regular />
                  </span>
                  <div>
                    <Text as="span" className={styles.eyebrow}>Application</Text>
                    <Text as="h2" block>{activeApplication.name}</Text>
                    <Text as="p" block>
                      {activeApplication.description || 'No description provided.'}
                    </Text>
                  </div>
                </div>
                <Button
                  className={styles.deleteButton}
                  appearance="subtle"
                  icon={<Delete20Regular />}
                  aria-label={`Delete ${activeApplication.name}`}
                  onClick={() => onDeleteApplication(activeApplication.id)}
                />
              </div>
              <div className={styles.detailStats}>
                <Text as="span">
                  <Text as="strong" weight="semibold">
                    {activeApplicationResources.length}
                  </Text>{' '}
                  Resources
                </Text>
                <Text as="span">
                  <Text as="strong" weight="semibold">
                    {activeApplicationStats.providerCount}
                  </Text>{' '}
                  Providers
                </Text>
                <Text as="span">
                  <Text as="strong" weight="semibold">
                    {activeApplicationStats.openIssues}
                  </Text>{' '}
                  Open issues
                </Text>
                <Text as="span">
                  Created {createdDateFormatter.format(new Date(activeApplication.createdAt))}
                </Text>
              </div>
              <div className={styles.graphHeading}>
                <div>
                  <Text as="h3" block>Resource map</Text>
                  <Text as="p" block>
                    Connections between this application and its cloud resources.
                  </Text>
                </div>
                <Badge appearance="tint" color="success">
                  Live inventory
                </Badge>
              </div>
              <Suspense
                fallback={
                  <div className={styles.graphLoading}>
                    <Spinner size="small" label="Loading resource map" />
                  </div>
                }
              >
                <ApplicationGraph
                  application={activeApplication}
                  resources={activeApplicationResources}
                />
              </Suspense>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
