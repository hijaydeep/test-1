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

const EditUserDrawer = () => {

    const router = useRouter();
    const params = useParams();
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        const id = params.id;
        const fetchUserData = async () => {
            const res = await fetch(`http://localhost:3000/api/apps/user/${id}`);
            const data = await res.json();
            setFormData(data.user);
        };
        fetchUserData();
    }, [params.id]);

    const handleBack = () => {
        router.push('/apps/user/list');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const prepareData = {
            fullName: formData.fullName,
            company: formData.company,
            username: formData.username,
            country: formData.country,
            contact: formData.contact,
            email: formData.email,
            status: formData.status
        }

        const res = await fetch(`http://localhost:3000/api/apps/user/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prepareData)
        });
        if (res.status === 200) {
            router.push('/apps/user/list');
        } else {
            console.log('An error occurred');
        }
    };

    return (
        <>
            <div className='flex items-center justify-between pli-5 plb-[15px]'>
                <Typography variant='h5'>Edit User</Typography>
                <IconButton onClick={handleBack}>
                    <i className='ri-close-line' />
                </IconButton>
            </div>
            <Divider />
            <div className='p-5'>
                <form onSubmit={handleUpdate} className='flex flex-col gap-5'>
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
                        name='email'
                        fullWidth
                        placeholder='johndoe@gmail.com'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Company'
                        name='company'
                        fullWidth
                        placeholder='Company PVT LTD'
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id='country'>Select Country</InputLabel>
                        <Select
                            fullWidth
                            id='country'
                            name='country'
                            value={formData.country}
                            onChange={handleChange}
                            label='Select Country'
                            labelId='country'
                            inputProps={{ placeholder: 'Country' }}
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

export default EditUserDrawer;
