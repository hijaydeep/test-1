'use client';

import React, { useState, useEffect } from 'react';
import ConditionListTable from './ConditionListTable'
import ConditionListCards from './ConditionListCards';
import Grid from '@mui/material/Grid';

const ConditionList = () => {

  const [conditionList, setConditionList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3000/api/apps/condition/list')
      const data = await res.json();
      setConditionList(data);
    }
    getData()
  }, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ConditionListCards />
      </Grid>
      <Grid item xs={12}>
        <ConditionListTable tableData={conditionList} />
      </Grid>
    </Grid>
  )
}

export default ConditionList;
