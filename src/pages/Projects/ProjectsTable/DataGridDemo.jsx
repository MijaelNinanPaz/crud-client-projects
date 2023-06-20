import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import { useFetch } from '../../../services/hooks/useFetch';
import { useSelector } from 'react-redux';

const DataGridFixed = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'location',
    headerName: 'Location',
    width: 150,
    editable: true,
  },
  {
    field: 'projectName',
    headerName: 'Project name',
    width: 150,
    editable: true,
  },
  {
    field: 'utilityProviders',
    headerName: 'Utility providers',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'designConditions',
    headerName: 'Design conditions',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'dwellingInfo',
    headerName: 'Dwelling info',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'workscope',
    headerName: 'Workscope',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'dateCreated',
    headerName: 'Date created',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const url = import.meta.env.VITE_URL_BACKEND_CONTRACTORS;

export default function DataGridDemo() {
  const { 
    loading,
    error,
    handleCancelRequest
  } = useFetch(url)

  const projects = useSelector( state => state.projects.list )

  return (
    <>
      <DataGridFixed
          sx={{ height: 400, width: '100%' }}
          // rows={rows}
          rows={projects}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <button onClick={handleCancelRequest}>Cancel Request</button>
    </>
  );
}