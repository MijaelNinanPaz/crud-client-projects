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
import { postProject } from '../../../state/redux/projects/projectSlice';
import { usePost } from '../../../services/hooks/usePost';

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

const DialogAddProject = ({ open, handleClose }) => {
	const [projectData, setProjectData] = useState({
        name: "",
        last_name: "",
        phone: "",
        mail: ""
    });
    const [address, setAddress] = useState(null)
    // const loading = useSelector( state => state.projects.loadingPost )

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
            address
        }
        console.log(newProject);

        const url = import.meta.env.VITE_URL_BACKEND_CONTRACTORS;
		const { 
			loading,
			error,
			handleCancelRequest
		} = usePost(url, newProject)

        handleClose();
    };

	const onCLickCancel = e => {
		e.preventDefault();
		handleClose();
	}

	return (
		<Dialog
			maxWidth={"xl"}
			fullWidth={true}
			// PaperProps={{ style: {
			// 	minHeight: '90%',
			// 	maxHeight: '90%',
			// }}}
			open={open}
			onClose={handleClose}>
			<DialogTitle>Add project</DialogTitle>
			<DialogContent>
				<DialogContentText>
					The consigned data will be very useful
					for the system processes.
				</DialogContentText>
				<Box sx={{ flexGrow: 1 }}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={3}>
								<Item>
									<TextField
										autoFocus
										margin="dense"
										id="name"
										name="name"
										label="Name"
										type="text"
										fullWidth
										variant="standard"
										value={projectData.name}
										onChange={handleInputChange}
									/>
								</Item>
							</Grid>
							<Grid item xs={12} md={3}>
								<Item>
									<TextField
										autoFocus
										margin="dense"
										id="last_name"
										name="last_name"
										label="Last name"
										type="text"
										fullWidth
										variant="standard"
										value={projectData.last_name}
										onChange={handleInputChange}
									/>
								</Item>
							</Grid>
							<Grid item xs={12} md={3}>
								<Item>
									<TextField
										autoFocus
										margin="dense"
										id="phone"
										name="phone"
										label="Phone"
										type="text"
										fullWidth
										variant="standard"
										value={projectData.phone}
										onChange={handleInputChange}
									/>
								</Item>
							</Grid>
							<Grid item xs={12} md={3}>
								<Item>
									<TextField
										autoFocus
										margin="dense"
										id="mail"
										name="mail"
										label="Email Address"
										type="email"
										fullWidth
										variant="standard"
										value={projectData.mail}
										onChange={handleInputChange}
									/>
								</Item>
							</Grid>
							<Grid item xs={12} md={12}>
								<ItemMap>
									<GoogleMapDirection setGeoJson={setAddress} />
								</ItemMap>
							</Grid>
						</Grid>
					</form>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCLickCancel}>Cancel</Button>
				<Button onClick={handleSubmit}>Add</Button>
			</DialogActions>
		</Dialog>
	)
};

export default DialogAddProject;
