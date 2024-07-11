'use client';

import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const TableFilters = ({ setData, tableData }) => {

    const [filters, setFilters] = useState({
        role: '',
        plan: '',
        status: '',
    });

    const filterData = (data, filters) => {
        return data?.filter(user => {
            if (filters.role && user.role !== filters.role) return false;
            if (filters.plan && user.currentPlan !== filters.plan) return false;
            if (filters.status && user.status !== filters.status) return false;
            return true;
        });
    };

    useEffect(() => {
        const filteredData = filterData(tableData, filters);
        setData(filteredData);
    }, [filters, tableData, setData]);

    return (
        <CardContent>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id='status-select'>Select Status</InputLabel>
                        <Select
                            fullWidth
                            id='select-status'
                            label='Select Status'
                            value={filters.status}
                            onChange={e => setFilters({ ...filters, status: e.target.value })}
                            labelId='status-select'
                            inputProps={{ placeholder: 'Select Status' }}
                        >
                            <MenuItem value='' disabled>Select Status</MenuItem>
                            <MenuItem value='pending'>Pending</MenuItem>
                            <MenuItem value='active'>Active</MenuItem>
                            <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </CardContent>
    )
}

export default TableFilters;
