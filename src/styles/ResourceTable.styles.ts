import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useResourceTableStyles = makeStyles({
  scroll: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: tokens.fontSizeBase200,
    '& th': {
      height: '40px',
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
      color: tokens.colorNeutralForeground3,
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
      textAlign: 'left',
      textTransform: 'uppercase',
      fontSize: '10px',
      letterSpacing: '0.65px',
      fontWeight: tokens.fontWeightBold,
      whiteSpace: 'nowrap',
    },
    '& td': {
      height: '67px',
      ...shorthands.padding(
        tokens.spacingVerticalS,
        tokens.spacingHorizontalM,
      ),
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
      color: tokens.colorNeutralForeground2,
    },
    '& tbody tr:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '& tbody tr:last-child td': {
      borderBottom: 0,
    },
  },
  selectedRow: {
    backgroundColor: tokens.colorBrandBackground2,
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  selectColumn: {
    width: '46px',
    paddingLeft: `${tokens.spacingHorizontalXL} !important`,
    paddingRight: `${tokens.spacingHorizontalSNudge} !important`,
  },
  resourceCell: {
    minWidth: '250px',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    '& strong': {
      display: 'block',
      color: tokens.colorNeutralForeground1,
      fontSize: tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightSemibold,
      marginBottom: tokens.spacingVerticalXXS,
    },
    '& span': {
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase100,
    },
  },
  providerMark: {
    width: '32px',
    height: '32px',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontWeight: tokens.fontWeightBold,
  },
  aws: {
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    color: tokens.colorPaletteMarigoldForeground2,
  },
  gcp: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: tokens.colorPaletteBlueForeground2,
  },
  azure: {
    backgroundColor: tokens.colorPaletteTealBackground2,
    color: tokens.colorPaletteTealForeground2,
  },
  providerLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  providerIcon: {
    flexShrink: 0,
  },
  awsIcon: { color: tokens.colorPaletteMarigoldForeground1 },
  gcpIcon: { color: tokens.colorPaletteBlueForeground2 },
  azureIcon: { color: tokens.colorPaletteTealForeground2 },
  environment: {
    textTransform: 'capitalize',
  },
  production: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground2,
  },
  staging: {
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    color: tokens.colorPaletteMarigoldForeground2,
  },
  development: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
  },
  criticality: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    textTransform: 'capitalize',
  },
  criticalityDot: {
    width: '7px',
    height: '7px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  critical: { backgroundColor: tokens.colorPaletteRedForeground1 },
  high: { backgroundColor: tokens.colorPaletteDarkOrangeForeground1 },
  medium: { backgroundColor: tokens.colorPaletteMarigoldForeground1 },
  low: { backgroundColor: tokens.colorNeutralForeground3 },
  issuesColumn: {
    textAlign: 'center !important' as 'center',
    width: '105px',
  },
  empty: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '& h3': {
      ...shorthands.margin(
        tokens.spacingVerticalM,
        0,
        tokens.spacingVerticalXS,
      ),
      fontSize: tokens.fontSizeBase400,
    },
    '& p': {
      margin: 0,
      color: tokens.colorNeutralForeground2,
      fontSize: tokens.fontSizeBase200,
    },
  },
  emptyIcon: {
    width: '44px',
    height: '44px',
    display: 'grid',
    placeItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
})
