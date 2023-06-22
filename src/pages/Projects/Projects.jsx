import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ProjectsTable } from './ProjectsTable';
import { DialogAddProject } from './DialogAddProject';
import DataGridProjects from './ProjectsTable/DataGridProjects';

const Projects = () => {
    const [openAddProject, setOpenAddProject] = React.useState(false);
    const handleClickOpen = () => {
        setOpenAddProject(true);
    };

    const handleClose = () => {
        setOpenAddProject(false);
    };

    return (
        <>
            {/* <ProjectsTable /> */}
            <DataGridProjects />
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 18,
                }}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            <DialogAddProject open={openAddProject} handleClose={handleClose}/>
        </>
    )
}

export default Projects