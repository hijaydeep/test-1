const rating = {
  MuiRating: {
    styleOverrides: {
      root: {
        color: 'var(--mui-palette-warning-main)',
        '& i, & svg': {
          flexShrink: 0
        }
      }
    }
  }
}

export default rating
