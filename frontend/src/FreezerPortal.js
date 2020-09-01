import React from 'react';
import PropTypes from 'prop-types';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import UnassignedDeliveries from './UnassignedDeliveries';
import FreezerLog from './FreezerLog';
import FreezerManagers from './FreezerManagers';

const useStyles = makeStyles((theme) => ({
    Navigation_root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
    root: {
        backgroundColor: 'rgb(239, 230, 215)',
        flexGrow: 1
    }
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function FreezerPortal(props) {

  
    //Used for the Navigation Drawer
    const classes = useStyles();
    const theme = useTheme();


    const [value, setValue] = React.useState('0');
    const handleChange = (event, newValue) => {
        console.log("Set Value to : " + newValue);
        setValue(newValue);
    }
    const handleChangeIndex = (index) => {
        setValue(index);
    }

    
    //For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

    return (
        <>
        <div className={classes.root}>
            {/* <BottomNavigation value={value} onChange={handleChange} className={classes.Navigation_root}>
                <BottomNavigationAction lable="New Deliveries" value="0" icon={<NotificationsActiveIcon/>} {...a11yProps(0)}/>
                <BottomNavigationAction lable="Deliveries" value="1" icon={<LocalShippingIcon/>} {...a11yProps(1)}/>
                <BottomNavigationAction lable="Freezers" value="2" icon={<AcUnitIcon/>} {...a11yProps(2)}/>
                <BottomNavigationAction lable="My Profile" value="3" icon={<PersonIcon/>} {...a11yProps(3)}/>
            </BottomNavigation> */}
            
                
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>

                        <UnassignedDeliveries title = "Assigned Deliveries" url = {"http://"+window.location.hostname+":3000/volunteer/getNewDeliveries"}>
                        </UnassignedDeliveries>       

                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>

                       {/* <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteers/getFreezerManagers"}> */}
                       <FreezerManagers 
                            title="Freezer Managers" 
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers"}
                            user_id = {props.user_id}>
                       </FreezerManagers>

                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>

                        <FreezerLog 
                            title = "Freezer Log" 
                            url = {"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                            user_id = {props.user_id}>
                        </FreezerLog>

                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>

                        <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers222"}>
                       </FreezerManagers>

                    </TabPanel>
                </SwipeableViews>
                <AppBar position="static" color="default" className={classes.Navigation_root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="Test 1" icon={<NotificationsActiveIcon/>} {...a11yProps(0)} />
                    <Tab label="Test 2 " icon={<LocalShippingIcon/>} {...a11yProps(1)} />
                    <Tab label="Freezers" icon={<AcUnitIcon/>} {...a11yProps(2)} />
                    <Tab label="Profile" icon={<PersonIcon/>} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                </div>
        </>
        
        

    );
}

export default FreezerPortal;
