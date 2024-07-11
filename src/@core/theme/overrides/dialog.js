const dialog = skin => ({
  MuiDialog: {
    styleOverrides: {
      paper: {
        ...(skin !== 'bordered'
          ? {
              boxShadow: 'var(--mui-customShadows-xl)'
            }
          : {
              boxShadow: 'none'
            })
      }
    }
  },
  MuiDialogTitle: {
    defaultProps: {
      variant: 'h5'
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogActions-root': {
          paddingTop: 0
        }
      })
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '& + .MuiDialogContent-root, & + .MuiDialogActions-root': {
          paddingTop: 0
        }
      })
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(5),
        '&:where(.dialog-actions-dense)': {
          padding: theme.spacing(2.5),
          '& .MuiButton-text': {
            paddingInline: theme.spacing(2.5)
          }
        }
      })
    }
  }
})

export default dialog
