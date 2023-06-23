import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import { useFetch } from '../../../services/hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { projects } from '../../../data/projects';
import { Button } from '@mui/material';

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
    width: 200,
    editable: true,
  },
  {
    field: 'projectName',
    headerName: 'Project name',
    width: 200,
    editable: true,
  },
  // {
  //   field: 'utilityProviders',
  //   headerName: 'Utility providers',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'designConditions',
  //   headerName: 'Design conditions',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'dwellingInfo',
  //   headerName: 'Dwelling info',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'workscope',
  //   headerName: 'Workscope',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  {
    field: 'dateCreated',
    headerName: 'Date created',
    type: 'number',
    width: 300,
    editable: true,
  }
];


export default function DataGridProjects() {
  // const { 
	// 	loading,
	// 	error,
	// 	handleCancelRequest
	// } = useFetch('projects')

	// const { 
	// 	loading,
	// 	errorGet,
	// 	handleCancelRequest
	// } = dispatch(getData('projects'))
	
	// const projects = useSelector( state => state.projects.list )

  const loading = false;
	const error = null;
	const handleCancelRequest = () => console.log("Request cancelled");

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
        <Button onClick={handleCancelRequest}>Cancel Request</Button>
    </>
  );
}