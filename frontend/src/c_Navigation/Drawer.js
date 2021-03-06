import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalShipping from '@material-ui/icons/LocalShipping'
import { Person, AcUnit } from '@material-ui/icons';

const pageIndex = require('./pageIndexer')
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [display, setDisplay] = React.useState(true)
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDisplay(!display)
    setState({ ...state, [anchor]: display });
  };
  //Function to create a list
  //This is passed text, an <icon/> and a page number
  const listItem =  (text,icon,page) => (
 
      (
        //set up the item, on click re-renders the main app page setting the state of page to whatever is sent to this function
          <ListItem button key={text} onClick = {()=>props.setPage(page)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )
      
  );

  return (
    <div className={classes.root}>
 
            {['left'].map((anchor) => (
            
            <React.Fragment key={anchor}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              > 
                <div
                  className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                  })}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                > 
                  <List>
                    {/* If the user's logged in status is greater than 2 (managers are level 3) show reporting tab */}
                    {(props.loggedIn>2) ? listItem("Managers Portal", <AssessmentIcon/>,pageIndex["reporting"]) : null       }
                    {/* {(props.loggedIn>2) ? listItem("Delivery Reporting", <AssessmentIcon/>,pageIndex["deliveryreporting"]) : null       } */}
                    {(props.loggedIn>0) ? listItem("Deliveries", <LocalShipping/>,pageIndex["delivererportal"]) : null       }
                    {(props.loggedIn>0) ? listItem("Freezers", <AcUnit/>,pageIndex["freezerportal"]) : null       }
                    {(props.loggedIn>0) ? listItem("Profile", <Person/>,pageIndex["profile"]) : null       }

                  </List>
                  <Divider />
                  <List >
                    
                      <ListItem button key={"draw_login_li"} onClick = {()=>props.setLogged([0,-1])}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary={props.loggedIn>0 ? "Logout" : "Login"} />
                      </ListItem>
                  </List>
                </div>
              </SwipeableDrawer>
            </React.Fragment>
          ))}
      
    </div>
  );
}