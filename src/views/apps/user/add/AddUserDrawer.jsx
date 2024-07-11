'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Typography
} from '@mui/material';

export const dynamic = 'force-dynamic'

const initialData = {
  fullName: '',
  username: '',
  email: '',
  company: '',
  country: '',
  contact: '',
  role: '',
  plan: '',
  status: ''
}

const AddUserDrawer = () => {

  const router = useRouter();
  const [formData, setFormData] = useState(initialData);

  const handleBack = () => {
    setFormData(initialData);
    router.push('/apps/user/list');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = {
      fullName: formData.fullName,
      company: formData.company,
      username: formData.username,
      country: formData.country,
      contact: formData.contact,
      email: formData.email,
      status: formData.status,
    }

    const res = await fetch('http://localhost:3000/api/apps/user/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)
    });
    const data = await res.json()

    if (res.status === 200) {
      setFormData(data);
      router.push('/apps/user/list')
    } else {
      console.log('An error occurred');
    }
  };

  return (
    <>
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton onClick={handleBack}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            label='Full Name'
            name='fullName'
            fullWidth
            placeholder='John Doe'
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            label='Username'
            name='username'
            fullWidth
            placeholder='johndoe'
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label='Email'
            fullWidth
            name='email'
            placeholder='johndoe@gmail.com'
            value={formData.email}
            onChange={handleChange}
            type='email'
          />
          <TextField
            label='Company'
            name='company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel id='country'>Select Country</InputLabel>
            <Select
              fullWidth
              id='country'
              name='country'
              value={formData.country}
              onChange={handleChange}
              label='Select Country'
            >
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label='Contact'
            name='contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={handleChange}
          />

          <FormControl>
            <InputLabel id='plan-select'>Select Status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              label='Select Status'
            >
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='error' onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUserDrawer;