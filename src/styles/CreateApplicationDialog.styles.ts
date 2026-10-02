import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useCreateApplicationDialogStyles = makeStyles({
  drawer: {
    width: 'min(485px, 100vw)',
  },
  backdrop: {
    backgroundColor: tokens.colorBackgroundOverlay,
  },
  header: {
    ...shorthands.padding(
      tokens.spacingVerticalXXXL,
      tokens.spacingHorizontalXXXL,
      tokens.spacingVerticalXL,
    ),
  },
  eyebrow: {
    display: 'block',
    color: tokens.colorBrandForeground1,
    textTransform: 'uppercase',
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightBold,
    letterSpacing: '1.3px',
    marginBottom: tokens.spacingVerticalXS,
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
  body: {
    paddingLeft: tokens.spacingHorizontalXXXL,
    paddingRight: tokens.spacingHorizontalXXXL,
    '@media (max-width: 520px)': {
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    },
  },
  form: {
    display: 'grid',
    gap: tokens.spacingVerticalL,
  },
  optional: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
    marginLeft: tokens.spacingHorizontalXS,
  },
  textarea: {
    minHeight: '76px',
  },
  preview: {
    marginTop: tokens.spacingVerticalS,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    overflow: 'hidden',
  },
  previewHeading: {
    ...shorthands.padding(
      tokens.spacingVerticalM,
      tokens.spacingHorizontalM,
    ),
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    justifyContent: 'space-between',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase100,
  },
  previewList: {
    maxHeight: '270px',
    overflowY: 'auto',
  },
  previewResource: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    ...shorthands.padding(
      tokens.spacingVerticalM,
      tokens.spacingHorizontalM,
    ),
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderBottom: 0,
    },
    '& strong': {
      display: 'block',
      color: tokens.colorNeutralForeground1,
      fontSize: tokens.fontSizeBase200,
      marginBottom: tokens.spacingVerticalXXS,
    },
    '& span': {
      color: tokens.colorNeutralForeground3,
      fontSize: tokens.fontSizeBase100,
    },
  },
  provider: {
    width: tokens.spacingHorizontalXXXL,
    height: tokens.spacingVerticalXXXL,
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontWeight: tokens.fontWeightBold,
  },
  aws: {
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    color: `${tokens.colorPaletteMarigoldForeground2} !important`,
  },
  gcp: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: `${tokens.colorPaletteBlueForeground2} !important`,
  },
  azure: {
    backgroundColor: tokens.colorPaletteTealBackground2,
    color: `${tokens.colorPaletteTealForeground2} !important`,
  },
  footer: {
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    ...shorthands.padding(
      tokens.spacingVerticalXL,
      tokens.spacingHorizontalXXXL,
      tokens.spacingVerticalXXXL,
    ),
  },
})
