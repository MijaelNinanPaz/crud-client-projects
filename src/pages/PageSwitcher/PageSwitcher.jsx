import React, { useEffect, useState } from 'react';
import { Projects } from '../Projects';
import { ProjectLocation } from '../Projects/CreateProject';


const PAGE_SWITCHER = {
	Projects: <Projects />,
	ProjectLocation: <ProjectLocation />,
}
const PAGE_DEFAULT = <Projects />;

const PageSwitcher = () => {
	const [switchPage, setSwitchPage] = useState('Projects');
	

	return PAGE_SWITCHER[switchPage] || PAGE_DEFAULT
};

export default PageSwitcher;
