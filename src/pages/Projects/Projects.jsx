import React from 'react'
import { ProjectsTable } from './ProjectsTable';
import DataGridProjects from './ProjectsTable/DataGridProjects';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPageRender } from '../../state/redux/pageSwitcher/pageSwitcherSlice';

const Projects = () => {
    const dispatch = useDispatch()
    const onClickNew = () => {
        dispatch(setPageRender('ProjectLocation'))
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