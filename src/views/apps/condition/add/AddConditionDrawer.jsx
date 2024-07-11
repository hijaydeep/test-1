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
  name: '',
  description: '',
  topic: '',
  topicDescription: '',
  status: ''
}

const AddConditionDrawer = () => {

  const router = useRouter();
  const [formData, setFormData] = useState(initialData);

  const handleBack = () => {
    setFormData(initialData);
    router.push('/apps/condition/list');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = {
      name: formData.name,
      description: formData.description,
      topic: formData.topic,
      topicDescription: formData.topicDescription,
      status: formData.status,
    }

    const res = await fetch('http://localhost:3000/api/apps/condition/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data)
    });
    const data = await res.json()

    if (res.status === 200) {
      setFormData(data);
      router.push('/apps/condition/list')
    } else {
      console.log('An error occurred');
    }
  };

  return (
    <>
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add New Condition</Typography>
        <IconButton onClick={handleBack}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            label='Name'
            name='name'
            fullWidth
            placeholder='Enter Name'
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label='Description'
            name='description'
            type="textarea"
            fullWidth
            placeholder='Enter Description...'
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label='Topic'
            name='topic'
            fullWidth
            placeholder='Enter Topic'
            value={formData.topic}
            onChange={handleChange}
          />
          <TextField
            label='Topic Description'
            name='topicDescription'
            type="textarea"
            fullWidth
            placeholder='Enter Topic Description...'
            value={formData.topicDescription}
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

export default AddConditionDrawer;
