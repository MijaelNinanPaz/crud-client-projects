import React, { useEffect, useState } from 'react';
import { Projects } from '../Projects';
import { ProjectLocation } from '../Projects/CreateProject';
import { useSelector } from 'react-redux';


const PageSwitcher = () => {
	// const page = useSelector( state => state.pageSwitcher.page )
	const PAGE_SWITCHER = {
		Projects: <Projects />,
		ProjectLocation: <ProjectLocation />,
	}
	const PAGE_DEFAULT = <Projects />;
	
	return PAGE_SWITCHER[useSelector( state => state.pageSwitcher.page )] || PAGE_DEFAULT
};

export default PageSwitcher;