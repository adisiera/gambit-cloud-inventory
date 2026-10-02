import {
  Card,
  Text,
  mergeClasses,
} from '@fluentui/react-components'
import {
  Alert24Regular,
  BoxMultiple24Regular,
  Flash24Regular,
  ShieldCheckmark24Regular,
} from '@fluentui/react-icons'
import { useAppStyles } from '../App.styles'

interface MetricCardProps {
  label: string
  value: number
  detail: string
  icon: 'stack' | 'bolt' | 'shield' | 'alert'
  danger?: boolean
}

const icons = {
  stack: <BoxMultiple24Regular />,
  bolt: <Flash24Regular />,
  shield: <ShieldCheckmark24Regular />,
  alert: <Alert24Regular />,
}

export const MetricCard = ({
  label,
  value,
  detail,
  icon,
  danger,
}: MetricCardProps) => {
  const styles = useAppStyles()
  const iconStyles = {
    stack: styles.metricStack,
    bolt: styles.metricBolt,
    shield: styles.metricShield,
    alert: styles.metricAlert,
  }

  return (
    <Card className={styles.metricCard}>
      <div className={mergeClasses(styles.metricIcon, iconStyles[icon])} aria-hidden="true">
        {icons[icon]}
      </div>
      <div className={styles.metricContent}>
        <Text as="span" className={styles.metricLabel}>{label}</Text>
        <Text as="strong" className={styles.metricValue} weight="bold">{value}</Text>
        <Text
          as="span"
          size={100}
          className={mergeClasses(styles.metricDetail, danger && styles.dangerText)}
        >
          {detail}
        </Text>
      </div>
    </Card>
  )
}
