'use client';

import React, { useState, useEffect } from 'react';
import ArticleListTable from './ArticleListTable';
import ArticleListCards from './ArticleListCards';
import Grid from '@mui/material/Grid';

const UserList = () => {

  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3000/api/apps/articles/list')
      const data = await res.json();
      console.log(data)
      setArticleList(data);
    }
    getData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ArticleListCards />
      </Grid>
      <Grid item xs={12}>
        <ArticleListTable tableData={articleList} />
      </Grid>
    </Grid>
  )
}

export default UserList;
