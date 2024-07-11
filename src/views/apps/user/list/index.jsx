'use client';

import React, { useState, useEffect } from 'react';
import UserListTable from './UserListTable';
import UserListCards from './UserListCards';
import Grid from '@mui/material/Grid';

const UserList = () => {

  const [userList, setUserList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3000/api/apps/user/list')
      const data = await res.json();
      setUserList(data);
    }
    getData()
  }, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={userList} />
      </Grid>
    </Grid>
  )
}

export default UserList;
