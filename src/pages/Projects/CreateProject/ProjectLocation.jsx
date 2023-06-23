import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { GoogleMapDirection } from '../../../components';
import { useDispatch } from 'react-redux';
import postData from '../../../services/postData';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const Item = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const ItemMap = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const ProjectLocation = () => {
	const [projectData, setProjectData] = useState({
        id: '',
        location: '',
        projectName: '',
        // utilityProviders: {
		// 	electricUtilityProvider: '',
		// 	fossilFuelUtilityProvider: ''
		// },
		electricUtilityProvider: '',
		fossilFuelUtilityProvider: ''

        // designConditions: '',
        // dwellingInfo: '',
        // workscope: '',
        // dateCreated: ''
    });
    const [location, setLocation] = useState({})
    const [postStatus, setPostStatus] = useState({
		loading: false,
		error: null,
		controller:null
	})

    const handleInputChange = e => {
        setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
        });
    };
    
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const newProject = {
            ...projectData,
			// location
            location: {
				type: "Point",
				coordinates: [
					40.749933,
					-73.98633
				]
			}
        }
        console.log(newProject);

		// const handleCancelRequest = dispatch(postData('projects', newProject, setPostStatus, postStatus))

    };

	return (
		
		<Box sx={{ flexGrow: 1 }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<Item>
							<TextField
								autoFocus
								margin="dense"
								id="projectName"
								name="projectName"
								label="Project name"
								type="text"
								fullWidth
								variant="standard"
								value={projectData.projectName}
								onChange={handleInputChange}
							/>
						</Item>
					</Grid>
					<Grid item xs={12} md={4}>
						<Item>
							<FormControl fullWidth>
								<InputLabel id="electricUtilityProvider">Electric Utility provider</InputLabel>
								<Select
									autoFocus
									margin="dense"
									labelId="electricUtilityProvider"
									id="electricUtilityProvider"
									name="electricUtilityProvider"
									label="Electric Utility providers"
									type="text"
									fullWidth
									// variant="standard"
									value={projectData.electricUtilityProvider}
									onChange={handleInputChange}
								>
									<MenuItem value={'electric1'}>electric1</MenuItem>
									<MenuItem value={'electric2'}>electric2</MenuItem>
									<MenuItem value={'electric3'}>electric3</MenuItem>
								</Select>
							</FormControl>
						</Item>
					</Grid>
					<Grid item xs={12} md={4}>
						<Item>
							<FormControl fullWidth>
								<InputLabel id="fossilFuelUtilityProvider">Fossil Fuel Utility provider</InputLabel>
								<Select
									autoFocus
									margin="dense"
									labelId="fossilFuelUtilityProvider"
									id="fossilFuelUtilityProvider"
									name="fossilFuelUtilityProvider"
									label="Utility providers"
									type="text"
									fullWidth
									// variant="standard"
									value={projectData.fossilFuelUtilityProvider}
									onChange={handleInputChange}
								>
									<MenuItem value={'fossilFuel1'}>fossilFuel1</MenuItem>
									<MenuItem value={'fossilFuel2'}>fossilFuel2</MenuItem>
									<MenuItem value={'fossilFuel3'}>fossilFuel3</MenuItem>
								</Select>
							</FormControl>
						</Item>
					</Grid>
					<Grid item xs={12} md={12}>
						<ItemMap>
							<GoogleMapDirection setGeoJson={setLocation} />
						</ItemMap>
					</Grid>
				</Grid>
			</form>
		</Box>
	)
};

export default ProjectLocation;
