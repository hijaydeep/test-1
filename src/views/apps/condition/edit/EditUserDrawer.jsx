'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const dynamic = 'force-dynamic'

const initialData = {
    name: '',
  description: '',
  topic: '',
  topicDescription: '',
  status: ''
}

const EditConditionDrawer = () => {

    const router = useRouter();
    const params = useParams();
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        const id = params.id;
        const fetchUserData = async () => {
            const res = await fetch(`http://localhost:3000/api/apps/condition/${id}`);
            const data = await res.json();
            setFormData(data.condition);
        };
        fetchUserData();
    }, [params.id]);

    const handleBack = () => {
        router.push('/apps/condition/list');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const prepareData = {
            name: formData.name,
      description: formData.description,
      topic: formData.topic,
      topicDescription: formData.topicDescription,
      status: formData.status,
        }

        const res = await fetch(`http://localhost:3000/api/apps/condition/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prepareData)
        });
        if (res.status === 200) {
            router.push('/apps/condition/list');
        } else {
            console.log('An error occurred');
        }
    };

    return (
        <>
            <div className='flex items-center justify-between pli-5 plb-[15px]'>
                <Typography variant='h5'>Edit Condition</Typography>
                <IconButton onClick={handleBack}>
                    <i className='ri-close-line' />
                </IconButton>
            </div>
            <Divider />
            <div className='p-5'>
                <form onSubmit={handleUpdate} className='flex flex-col gap-5'>
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

                    <FormControl fullWidth>
                        <InputLabel id='plan-select'>Select Status</InputLabel>
                        <Select
                            fullWidth
                            id='select-status'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            label='Select Status'
                            labelId='status-select'
                            inputProps={{ placeholder: 'Select Status' }}
                        >
                            <MenuItem value='pending'>Pending</MenuItem>
                            <MenuItem value='active'>Active</MenuItem>
                            <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='flex items-center gap-4'>
                        <Button variant='contained' type='submit'>
                            Update
                        </Button>
                        <Button variant='outlined' color='error' onClick={handleBack}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditConditionDrawer;
