import {
  Avatar,
  Badge,
  Button,
  Text,
  mergeClasses,
} from '@fluentui/react-components'
import { Alert24Regular } from '@fluentui/react-icons'
import { useAppStyles } from '../App.styles'

export type AppView = 'resources' | 'applications'

interface AppHeaderProps {
  activeView: AppView
  applicationCount: number
  onViewChange: (view: AppView) => void
}

export const AppHeader = ({
  activeView,
  applicationCount,
  onViewChange,
}: AppHeaderProps) => {
  const styles = useAppStyles()

  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#" aria-label="Gambit home">
        <span className={styles.brandMark} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <Text as="span" className={styles.brandName}>gambit</Text>
      </a>
      <nav className={styles.navigation} aria-label="Primary navigation">
        <div className={styles.tabList}>
          <Button
            appearance="transparent"
            className={mergeClasses(
              styles.tab,
              activeView === 'resources' && styles.activeTab,
            )}
            aria-current={activeView === 'resources' ? 'page' : undefined}
            onClick={() => onViewChange('resources')}
          >
            Resources
          </Button>
          <Button
            appearance="transparent"
            className={mergeClasses(
              styles.tab,
              activeView === 'applications' && styles.activeTab,
            )}
            aria-current={activeView === 'applications' ? 'page' : undefined}
            onClick={() => onViewChange('applications')}
          >
            Applications
            {applicationCount > 0 && (
              <Badge
                className={styles.navBadge}
                appearance="tint"
                color="brand"
                size="small"
              >
                {applicationCount}
              </Badge>
            )}
          </Button>
        </div>
      </nav>
      <div className={styles.topbarActions}>
        <Button
          className={styles.notificationButton}
          appearance="subtle"
          icon={<Alert24Regular />}
          aria-label="Notifications"
        >
          <span className={styles.notificationDot} aria-hidden="true" />
        </Button>
        <Avatar
          className={styles.avatar}
          name="Alex Morgan"
          initials="AM"
          color="lavender"
          aria-label="Signed in as Alex Morgan"
        />
      </div>
    </header>
  )
}
