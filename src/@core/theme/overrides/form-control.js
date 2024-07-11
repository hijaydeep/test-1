const formControl = {
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInlineStart: theme.spacing(-2),

        // Radio & Checkbox
        '&.Mui-disabled:not(:has(.MuiSwitch-switchBase))': {
          opacity: 0.45
        },

        // Switch
        '&.Mui-disabled .MuiSwitch-root:has(.MuiSwitch-switchBase.Mui-disabled), &.Mui-disabled:has(.MuiSwitch-switchBase) .MuiFormControlLabel-label':
          {
            opacity: 0.45
          }
      }),
      label: {
        '&, &.Mui-disabled': {
          color: 'var(--mui-palette-text-primary)'
        }
      }
    }
  }
}

export default formControl
