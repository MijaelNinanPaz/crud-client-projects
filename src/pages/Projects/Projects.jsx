import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ProjectsTable } from './ProjectsTable';
import DataGridProjects from './ProjectsTable/DataGridProjects';
import { Box, Button } from '@mui/material';

const Projects = () => {

    const onClickNew = () => {
        console.log("holi")
    }
    return (
        <>
            <Box display="flex" justifyContent="flex-end" onClick={onClickNew}>
                <Button variant="contained" color="primary">
                    + New
                </Button>
            </Box>
            {/* <ProjectsTable /> */}
            <DataGridProjects />
        </>
    )
}

export default Projects