import React from 'react'
import { EnhancedTable } from '../../../components'
// import { DialogUpdateProject } from '../DialogUpdateProject';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../services/getData';
import { Button } from '@mui/material';
import { useFetch } from '../../../services/hooks/useFetch';

import { projects } from '../../../data/projects';

const ProjectsTable = () => {
	const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
	const [itemToEdit, setItemToEdit] = React.useState({})

	const dispatch = useDispatch();

	const handleClickOpenDialog = () => {
        setOpenUpdateDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenUpdateDialog(false);
    };
	

	const headCells = [
		{
			id: 'id',
			numeric: false,
			disablePadding: true,
			label: 'Id',
		},
		{
			id: 'location',
			numeric: false,
			disablePadding: true,
			label: 'Location',
		},
		{
			id: 'projectName',
			numeric: false,
			disablePadding: false,
			label: 'Project name',
		},
		// {
		// 	id: 'utilityProviders',
		// 	numeric: false,
		// 	disablePadding: false,
		// 	label: 'Utility providers',
		// },
		// {
		// 	id: 'designConditions',
		// 	numeric: false,
		// 	disablePadding: false,
		// 	label: 'Design conditions',
		// },
		// {
		// 	id: 'dwellingInfo',
		// 	numeric: false,
		// 	disablePadding: false,
		// 	label: 'Dwelling info',
		// },
		// {
		// 	id: 'workscope',
		// 	numeric: false,
		// 	disablePadding: false,
		// 	label: 'Workscope',
		// },
		{
			id: 'dateCreated',
			numeric: false,
			disablePadding: false,
			label: 'Date created',
		},
	];

	
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
			<Button onClick={handleCancelRequest}>Cancel Request</Button>
			{error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}
			{projects.length > 0 &&
			<>
				<EnhancedTable
				headCells={headCells}
				rows={projects}
				initialOrderBy={'id'}	// name of the field that will prioritize the order
				initialOrder={'desc'} 	// 'asc' or 'desc'
				handleClickOpenDialog={handleClickOpenDialog}
				setItemToEdit={setItemToEdit}
				/>
				{/* <DialogUpdateProject
					open={openUpdateDialog}
					handleClose={handleCloseDialog}
					itemToEdit={itemToEdit}
				/> */}
			</> }
		</>
		
	)
}

export default ProjectsTable
