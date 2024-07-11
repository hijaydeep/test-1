// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data = [
  {
    title: 'All',
    value: '21,459',
    avatarIcon: 'ri-article-line',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '29%',
    subTitle: 'Total Articles'
  },
  {
    title: 'Published',
    value: '4,567',
    avatarIcon: 'ri-article-line',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '18%',
    subTitle: 'Total Published'
  },
  {
    title: 'Draft Articles',
    value: '19,860',
    avatarIcon: 'ri-article-line',
    avatarColor: 'warning',
    change: 'negative',
    changeNumber: '14%',
    subTitle: 'Total Draft'
  },
  {
    title: 'Inactive',
    value: '237',
    avatarIcon: 'ri-article-line',
    avatarColor: 'error',
    change: 'positive',
    changeNumber: '42%',
    subTitle: 'Total Inactive'
  }
]

const ArticleListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ArticleListCards;
