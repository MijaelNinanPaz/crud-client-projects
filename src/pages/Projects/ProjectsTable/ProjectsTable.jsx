import React from 'react'
import { EnhancedTable } from '../../../components'
import { DialogUpdateProject } from '../DialogUpdateProject';
import { useFetch } from '../../../services/hooks/useFetch';
import { useSelector } from 'react-redux';

const ProjectsTable = () => {
	const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
	const [itemToEdit, setItemToEdit] = React.useState({})

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
		{
			id: 'utilityProviders',
			numeric: false,
			disablePadding: false,
			label: 'Utility providers',
		},
		{
			id: 'designConditions',
			numeric: false,
			disablePadding: false,
			label: 'Design conditions',
		},
		{
			id: 'dwellingInfo',
			numeric: false,
			disablePadding: false,
			label: 'Dwelling info',
		},
		{
			id: 'workscope',
			numeric: false,
			disablePadding: false,
			label: 'Workscope',
		},
		{
			id: 'dateCreated',
			numeric: false,
			disablePadding: false,
			label: 'Date created',
		},
	];

	const url = import.meta.env.VITE_URL_BACKEND_CONTRACTORS;
	const { 
		loading,
		error,
		handleCancelRequest
	} = useFetch(url)
	
	const projects = useSelector( state => state.projects.list )

	return (
		<>
			<button onClick={handleCancelRequest}>Cancel Request</button>
			{error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}
			<EnhancedTable
				headCells={headCells}
				rows={projects}
				initialOrderBy={'id'}	// name of the field that will prioritize the order
				initialOrder={'desc'} 	// 'asc' or 'desc'
				handleClickOpenDialog={handleClickOpenDialog}
				setItemToEdit={setItemToEdit}
			/>
			<DialogUpdateProject
				open={openUpdateDialog}
				handleClose={handleCloseDialog}
				itemToEdit={itemToEdit}
			/>
		</>
		
	)
}

export default ProjectsTable
