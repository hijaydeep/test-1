'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  Divider,
  Button,
  TextField,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  TablePagination
} from '@mui/material';
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
import CustomAvatar from '@core/components/mui/Avatar';
import { getInitials } from '@/utils/getInitials';
import tableStyles from '@core/styles/table.module.css';
import TableFilters from './TableFilters';


const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank
  });
  return itemRank.passed;
};

const DebouncedInput = ({ value: initialValue, onChange, ...props }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const columnHelper = createColumnHelper()

const ConditionListTable = ({ tableData }) => {

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (tableData && tableData.users) {
      setData(tableData.users);
    }
  }, [tableData]);

  const handleDelete = async (userId) => {

    const res = await fetch(`http://localhost:3000/api/apps/condition/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId)
    });

    if (res.status === 200) {
      setData(prevData => prevData.filter(user => user.id !== userId));
    } else {
      console.log('An error occurred');
    }
  };

  const AvatarCell = ({ row }) => (
    <div className='flex items-center gap-4'>
      {row.original.avatar ? (
        <CustomAvatar src={row.original.avatar} skin='light' size={34} />
      ) : (
        <CustomAvatar skin='light' size={34}>
          {getInitials(row.original.name)}
        </CustomAvatar>
      )}
      <div className='flex flex-col'>
        <Typography className='font-medium' color='text.primary'>
          {row.original.name}
        </Typography>
        {/* <Typography variant='body2'>{row.original.username}</Typography> */}
      </div>
    </div>
  );

  const StatusCell = ({ row }) => (
    <div className='flex items-center gap-3'>
      <Chip
        variant='tonal'
        className='capitalize'
        label={row.original.status}
        color={userStatusObj[row.original.status]}
        size='small'
      />
    </div>
  );

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'Condition',
        cell: AvatarCell,
      }),
      // columnHelper.accessor('email', {
      //   header: 'Email',
      //   cell: ({ row }) => <Typography>{row.original.email}</Typography>
      // }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: StatusCell,
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <i className='ri-delete-bin-7-line text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href='apps/condition/view' className='flex'>
                <i className='ri-eye-line text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={`/apps/condition/edit/${row.original.id}`} className='flex'>
                <i className='ri-edit-box-line mui-fvgoc text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  );

  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,

    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      {tableData && tableData.users ? (
        <Card>
          <CardHeader title='Filters' />
          <TableFilters setData={setData} tableData={tableData.users} />
          <Divider />
          <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
            <Button
              color='secondary'
              variant='outlined'
              startIcon={<i className='ri-upload-2-line text-xl' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <div className='flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row'>
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                placeholder='Search Condition'
                className='is-full sm:is-auto'
              />
              <Link href='/apps/condition/add' className='flex'>
                <Button variant='contained'>Add New Condition</Button>
              </Link>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='ri-arrow-up-s-line text-xl' />,
                                desc: <i className='ri-arrow-down-s-line text-xl' />
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => {
                      return (
                        <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                          ))}
                        </tr>
                      )
                    })}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            className='border-bs'
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
            onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
          />
        </Card>
      ) : (
        <p style={{ fontWeight: 500, fontSize: '30px' }} className='mt-3 p-1'>Loading...</p>
      )}
    </>
  );
};

export default ConditionListTable;
