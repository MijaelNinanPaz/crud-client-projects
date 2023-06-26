import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DrawerAppBar from './DrawerAppBar';
import DrawerHeader from './DrawerHeader';
import DrawerMain from './DrawerMain';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ThemeButton from '../ThemeButton/ThemeButton';
import { Projects } from '../../pages';
import { setPageRender } from '../../state/redux/pageSwitcher/pageSwitcherSlice';
import { useDispatch } from 'react-redux';



const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		width: '20ch',
		},
	},
}));

const PersistentDrawer = ({children}) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
	setOpen(false);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const dispatch=useDispatch();
	const onClickHome = () => {
        dispatch(setPageRender('Projects'))
    }

	const menuId = 'primary-search-account-menu';
	const mobileMenuId = 'primary-search-account-menu-mobile';

	const renderMenu = (
		<Menu
		sx={{ mt: '45px' }}
		anchorEl={anchorEl}
		anchorOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		id={menuId}
		keepMounted
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		open={isMenuOpen}
		onClose={handleMenuClose}
		>
		<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
		<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		<MenuItem>
			<ThemeButton />
		</MenuItem>
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
		anchorEl={mobileMoreAnchorEl}
		anchorOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		id={mobileMenuId}
		keepMounted
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		open={isMobileMenuOpen}
		onClose={handleMobileMenuClose}
		>
		<MenuItem>
			<IconButton size="large" aria-label="show 4 new mails" color="inherit">
			<Badge badgeContent={4} color="error">
				<MailIcon />
			</Badge>
			</IconButton>
			<p>Messages</p>
		</MenuItem>
		<MenuItem>
			<IconButton
			size="large"
			aria-label="show 17 new notifications"
			color="inherit"
			>
			<Badge badgeContent={17} color="error">
				<NotificationsIcon />
			</Badge>
			</IconButton>
			<p>Notifications</p>
		</MenuItem>
		<MenuItem onClick={handleProfileMenuOpen}>
			<IconButton
			size="large"
			aria-label="account of current user"
			aria-controls="primary-search-account-menu"
			aria-haspopup="true"
			color="inherit"
			>
			{/* <AccountCircle /> */}
			<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
			</IconButton>
			<p>Profile</p>
		</MenuItem>
		</Menu>
	);

	return (
	<Box sx={{ display: 'flex' }}>
		<DrawerAppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{ mr: 2, ...(open && { display: 'none' }) }}
				>
				<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { xs: 'none', sm: 'block' }, cursor:"pointer" }}
					onClick={onClickHome}
				>
					Cool Calc
				</Typography>
				<Search>
					<SearchIconWrapper>
					<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					placeholder="Search…"
					inputProps={{ 'aria-label': 'search' }}
					/>
				</Search>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
					</IconButton>
					<IconButton
						size="large"
						aria-label="show 17 new notifications"
						color="inherit"
					>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
					</IconButton>
					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
					>
					{/* <AccountCircle /> */}
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
					</IconButton>
				</Box>
				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
					size="large"
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
					>
					<MoreIcon />
					</IconButton>
				</Box>
			</Toolbar>
			{renderMobileMenu}
			{renderMenu}
		</DrawerAppBar>
		<Drawer
		sx={{
			width: drawerWidth,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
			width: drawerWidth,
			boxSizing: 'border-box',
			},
		}}
		variant="persistent"
		anchor="left"
		open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
				{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
				))}
			</List>
		</Drawer>
		<DrawerMain open={open}>
			<DrawerHeader />
			{children}
		</DrawerMain>
	</Box>
	);
}

export default PersistentDrawer;
