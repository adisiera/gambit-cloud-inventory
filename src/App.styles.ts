import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useAppStyles = makeStyles({
  shell: {
    minHeight: '100vh',
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground2,
    backgroundImage:
      'radial-gradient(circle at 85% 5%, rgba(15, 108, 189, 0.05), transparent 28rem)',
  },
  topbar: {
    height: '68px',
    paddingLeft: '42px',
    paddingRight: '42px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    position: 'sticky',
    top: 0,
    zIndex: 20,
    boxShadow: tokens.shadow2,
    '@media (max-width: 760px)': {
      height: '60px',
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    },
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '-0.5px',
    marginRight: '56px',
    textDecorationLine: 'none',
    '@media (max-width: 760px)': {
      marginRight: tokens.spacingHorizontalXXL,
    },
    '@media (max-width: 520px)': {
      marginRight: 'auto',
    },
  },
  brandName: {
    '@media (max-width: 520px)': {
      display: 'none',
    },
  },
  brandMark: {
    width: '28px',
    height: '28px',
    display: 'inline-flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '2px',
    padding: '6px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralForeground1,
    boxSizing: 'border-box',
    '& span': {
      width: '3px',
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.borderRadius(tokens.borderRadiusSmall),
      transform: 'rotate(38deg)',
    },
    '& span:nth-child(1)': { height: '8px' },
    '& span:nth-child(2)': {
      height: '14px',
      backgroundColor: tokens.colorBrandBackground2,
    },
    '& span:nth-child(3)': { height: '10px' },
  },
  navigation: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  tabList: {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
  },
  tab: {
    height: '100%',
    minWidth: 'auto',
    ...shorthands.borderRadius(0),
  },
  activeTab: {
    color: tokens.colorBrandForeground1,
    boxShadow: `inset 0 -2px 0 ${tokens.colorBrandStroke1}`,
  },
  navBadge: {
    marginLeft: tokens.spacingHorizontalXS,
  },
  topbarActions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  notificationButton: {
    position: 'relative',
    '@media (max-width: 760px)': {
      display: 'none',
    },
  },
  notificationDot: {
    position: 'absolute',
    width: '7px',
    height: '7px',
    top: '6px',
    right: '6px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorPaletteRedBackground3,
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  avatar: {
    '@media (max-width: 520px)': {
      display: 'none',
    },
  },
  page: {
    maxWidth: '1360px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '42px 42px 70px',
    '@media (max-width: 760px)': {
      padding: '28px 16px 50px',
    },
  },
  pageHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    '@media (max-width: 520px)': {
      display: 'grid',
      alignItems: 'start',
    },
  },
  eyebrow: {
    display: 'block',
    color: tokens.colorBrandForeground1,
    textTransform: 'uppercase',
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightBold,
    letterSpacing: '1.3px',
    marginBottom: tokens.spacingVerticalS,
  },
  pageTitle: {
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
    letterSpacing: '-1px',
    marginTop: 0,
    marginBottom: tokens.spacingVerticalXS,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    margin: 0,
    fontSize: tokens.fontSizeBase300,
  },
  primaryAction: {
    boxShadow: tokens.shadow4,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
    '@media (max-width: 1000px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 520px)': {
      gap: tokens.spacingHorizontalS,
    },
  },
  metricCard: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalM,
    boxShadow: tokens.shadow2,
    '@media (max-width: 760px)': {
      padding: tokens.spacingHorizontalM,
    },
  },
  metricIcon: {
    width: '44px',
    height: '44px',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    '@media (max-width: 760px)': {
      display: 'none',
    },
  },
  metricStack: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: tokens.colorPaletteBlueForeground2,
  },
  metricBolt: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground2,
  },
  metricShield: {
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    color: tokens.colorPaletteMarigoldForeground2,
  },
  metricAlert: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground2,
  },
  metricContent: {
    display: 'grid',
    justifyItems: 'center',
    rowGap: '2px',
    minWidth: 0,
    textAlign: 'center',
  },
  metricLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  metricValue: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    margin: 0,
  },
  metricDetail: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase100,
  },
  dangerText: {
    color: tokens.colorPaletteRedForeground1,
  },
  contentCard: {
    boxShadow: tokens.shadow2,
    overflow: 'hidden',
  },
  cardHeading: {
    padding: '20px 22px 15px',
    '& h2': {
      margin: 0,
      fontSize: tokens.fontSizeBase500,
      lineHeight: tokens.lineHeightBase500,
    },
    '& p': {
      marginTop: tokens.spacingVerticalXXS,
      marginBottom: 0,
      color: tokens.colorNeutralForeground2,
      fontSize: tokens.fontSizeBase200,
    },
  },
  toolbar: {
    minHeight: '70px',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: '10px 22px 17px',
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    '@media (max-width: 1000px)': {
      flexWrap: 'wrap',
    },
  },
  search: {
    width: 'min(360px, 35%)',
    '@media (max-width: 1000px)': {
      width: '100%',
    },
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginLeft: 'auto',
    '@media (max-width: 1000px)': {
      width: '100%',
      marginLeft: 0,
      overflowX: 'auto',
    },
  },
  filterSelect: {
    minWidth: '132px',
  },
  selectionBar: {
    margin: '12px 14px 0',
    padding: '8px 10px 8px 13px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    '@media (max-width: 520px)': {
      alignItems: 'flex-start',
    },
  },
  selectionSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap',
  },
  applicationsEmpty: {
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '& h2': {
      margin: '0 0 8px',
      fontSize: tokens.fontSizeBase600,
    },
    '& p': {
      maxWidth: '420px',
      margin: '0 0 22px',
      color: tokens.colorNeutralForeground2,
    },
  },
  emptyGraphic: {
    width: '92px',
    height: '92px',
    display: 'grid',
    placeItems: 'center',
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    '& svg': {
      width: '42px',
      height: '42px',
    },
  },
  applicationsLayout: {
    display: 'grid',
    gridTemplateColumns: '260px minmax(0, 1fr)',
    gap: tokens.spacingHorizontalL,
    alignItems: 'start',
    '@media (max-width: 1000px)': {
      gridTemplateColumns: '220px minmax(0, 1fr)',
    },
    '@media (max-width: 760px)': {
      gridTemplateColumns: '1fr',
    },
  },
  applicationList: {
    padding: tokens.spacingHorizontalS,
    '@media (max-width: 760px)': {
      display: 'flex',
      overflowX: 'auto',
      gap: tokens.spacingHorizontalXS,
    },
  },
  applicationListHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '7px 8px 16px',
    '& h2': {
      margin: 0,
      fontSize: tokens.fontSizeBase500,
    },
    '@media (max-width: 760px)': {
      display: 'none',
    },
  },
  applicationListItem: {
    width: '100%',
    minHeight: '54px',
    justifyContent: 'flex-start',
    marginBottom: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    '@media (max-width: 760px)': {
      minWidth: '190px',
    },
  },
  activeApplication: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  applicationItemContent: {
    minWidth: 0,
    display: 'grid',
    textAlign: 'left',
    '& strong': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: tokens.fontSizeBase200,
    },
    '& > span:last-child': {
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase100,
      marginTop: tokens.spacingVerticalXXS,
    },
  },
  applicationDetail: {
    boxShadow: tokens.shadow2,
    overflow: 'hidden',
  },
  detailHeader: {
    minHeight: '110px',
    padding: '23px 25px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  applicationTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
    '& h2': {
      margin: '0 0 3px',
      fontSize: tokens.fontSizeBase600,
    },
    '& p': {
      margin: 0,
      color: tokens.colorNeutralForeground2,
      fontSize: tokens.fontSizeBase200,
    },
  },
  applicationHeroIcon: {
    width: '48px',
    height: '48px',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    boxShadow: tokens.shadow4,
  },
  deleteButton: {
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      color: tokens.colorNeutralForeground2,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&:active': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  detailStats: {
    minHeight: '53px',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    paddingLeft: '25px',
    paddingRight: '25px',
    '& span': {
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase100,
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
      borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
      whiteSpace: 'nowrap',
    },
    '& span:first-child': { paddingLeft: 0 },
    '& span:last-child': { borderRight: 0 },
    '& strong': {
      color: tokens.colorNeutralForeground2,
      marginRight: tokens.spacingHorizontalXXS,
    },
  },
  graphHeading: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    padding: '23px 25px 0',
    '& h3': {
      margin: '0 0 4px',
      fontSize: tokens.fontSizeBase300,
    },
    '& p': {
      color: tokens.colorNeutralForeground2,
      margin: 0,
      fontSize: tokens.fontSizeBase100,
    },
  },
  graphLoading: {
    minHeight: '420px',
    display: 'grid',
    placeItems: 'center',
  },
})
