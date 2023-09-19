export const colorsConfig = {
  dark: {
    name: 'Dark',
    isDark: true,

    bg1: '#071218', // For page
    bg2: '#1D2830', // For controls
    bg3: '#424E57', // For overlays
    bg4: '#1D2830', // For header

    fg1: '#ffffff', // For text
    fg2: '#91ADD4', // For links
    fg3: '2FDF75', // For success alert
    fg4: 'FF4961', // For error alert
    fg5: '#ffffff', // For header text

    brdr1: '#424E57', // For borders
    brdr2: '#d4d4d4', // For focussed borders

    spin1: '#313A40', // Spinner color
  },
  light: {
    name: 'Light',
    isDark: false,

    bg1: '#FFFFFF', // For page
    bg2: '#E6EBF3', // For controls
    bg3: '#EAF1F1', // For overlays
    bg4: '#1D2830', // For header

    fg1: '#000000', // For text
    fg2: '#91ADD4', // For links
    fg3: '#2FDF75', // For success alert
    fg4: '#FF4961', // For error alert
    fg5: '#FFFFFF', // For header text

    brdr1: '#424E57', // For borders
    brdr2: '#d4d4d4', // For focussed borders

    spin1: '#313A40', // Spinner color
  },
};

export const createTheme = (key, overrides = {}) => {
  const colors = {
    ...colorsConfig[key],
    ...overrides,
  };

  return {
    THEME_NAME: colors.name,
    DARK_MODE: colors.isDark,
    PAGE_BACKGROUND: colors.bg1,
    CONTROL_BACKGROUND: colors.bg2,
    OVERLAY_BACKGROUND: colors.bg3,
    HEADER_BACKGROUND: colors.bg4,
    HEADER_TEXT: colors.fg5,
    TEXT_COLOR: colors.fg1,
    LINK_COLOR: colors.fg2,
    SUCCESS_COLOR: colors.fg3,
    ALERT_COLOR: colors.fg4,
    CONTROL_BORDER: colors.brdr1,
    CONTROL_BRODER_FOCUSSED: colors.brdr2,
    LOADING_COLOR: colors.spin1,
  };
};
