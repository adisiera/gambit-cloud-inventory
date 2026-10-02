import {
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components'

export const GRAPH_HEIGHT = 420
export const APPLICATION_NODE_SIZE = 126
export const RESOURCE_NODE_WIDTH = 180
export const RESOURCE_NODE_HEIGHT = 68

export const useApplicationGraphStyles = makeStyles({
  shell: {
    ...shorthands.padding(
      0,
      tokens.spacingHorizontalL,
      tokens.spacingVerticalM,
    ),
  },
  graph: {
    width: '100%',
    height: `${GRAPH_HEIGHT}px`,
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    '& .react-flow__pane': {
      cursor: 'grab',
    },
    '& .react-flow__pane:active': {
      cursor: 'grabbing',
    },
    '& .react-flow__edge-path': {
      strokeDasharray: '5 5',
    },
    '& .react-flow__controls': {
      overflow: 'hidden',
      boxShadow: tokens.shadow4,
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    '& .react-flow__controls-button': {
      width: '30px',
      height: '30px',
      color: tokens.colorNeutralForeground2,
      backgroundColor: tokens.colorNeutralBackground1,
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    },
    '& .react-flow__controls-button:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '& .react-flow__attribution': {
      color: tokens.colorNeutralForeground4,
      backgroundColor: tokens.colorTransparentBackground,
      fontSize: tokens.fontSizeBase100,
    },
  },
  applicationNode: {
    width: `${APPLICATION_NODE_SIZE}px`,
    height: `${APPLICATION_NODE_SIZE}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    color: tokens.colorNeutralForegroundOnBrand,
    textAlign: 'center',
    backgroundImage: `linear-gradient(135deg, ${tokens.colorBrandBackground}, ${tokens.colorBrandBackgroundHover})`,
    boxShadow: tokens.shadow16,
    border: 0,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  applicationContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: tokens.spacingVerticalXS,
    transform: `translateY(calc(${tokens.spacingVerticalXXS} * -1))`,
  },
  applicationIcon: {
    width: '34px',
    height: '34px',
    display: 'grid',
    placeItems: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  applicationLabel: {
    width: '100px',
    display: 'block',
    alignSelf: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    color: 'inherit',
    fontWeight: tokens.fontWeightSemibold,
  },
  applicationCount: {
    width: '100%',
    display: 'block',
    alignSelf: 'center',
    textAlign: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: 0.78,
  },
  resourceNode: {
    width: `${RESOURCE_NODE_WIDTH}px`,
    height: `${RESOURCE_NODE_HEIGHT}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: tokens.spacingHorizontalS,
    rowGap: 0,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke2,
    ),
    boxShadow: tokens.shadow4,
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  resourceIcon: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  aws: {
    color: tokens.colorPaletteMarigoldForeground2,
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
  },
  gcp: {
    color: tokens.colorPaletteBlueForeground2,
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
  azure: {
    color: tokens.colorPaletteTealForeground2,
    backgroundColor: tokens.colorPaletteTealBackground2,
  },
  resourceContent: {
    minWidth: 0,
    display: 'grid',
    flexGrow: 1,
    gap: tokens.spacingVerticalXXS,
  },
  resourceName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  resourceMeta: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground3,
  },
  providerBadge: {
    flexShrink: 0,
  },
  handle: {
    width: '1px',
    height: '1px',
    minWidth: 0,
    minHeight: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalXXL,
    marginTop: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase100,
    '& span': {
      display: 'inline-flex',
      alignItems: 'center',
      gap: tokens.spacingHorizontalXS,
    },
    '& i': {
      width: '8px',
      height: '8px',
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
    },
  },
  applicationLegend: {
    backgroundColor: tokens.colorBrandBackground,
  },
  resourceLegend: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
})
