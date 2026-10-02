import { Select } from '@fluentui/react-components'
import { useAppStyles } from '../App.styles'

interface FilterSelectProps {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

export const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) => {
  const styles = useAppStyles()

  return (
    <Select
      className={styles.filterSelect}
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="all">{label}: All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </Select>
  )
}
