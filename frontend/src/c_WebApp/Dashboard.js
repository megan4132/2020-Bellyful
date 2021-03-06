import React from 'react'
import {Grid, Typography, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import $ from 'jquery'
import ListFreezerStock from './ListFreezersStock'
const useStyles = makeStyles((theme) => ({
    padding : {
        padding : '2vh',
    },
    rows : {
        padding : '1vh',
    }
}));    


function Dashboard(props){
    
    const classes = useStyles();
    const [total,setTotal] = React.useState();

    React.useEffect(() => {
        
        $.post("http://"+window.location.hostname+":3000/freezer/getTotalMeals", function(returnable){    
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return
            $(setTotal(returnable))
            return
            
        });

    }, [classes]);

    return(
        <div >
            <Typography className = {classes.padding} variant = "h4" align = 'left'>Dashboard</Typography>
            
            <Typography className = {classes.padding} variant = "h5" align = 'left'>Stock Levels</Typography>
            
            <Grid className = {classes.padding}  direction = 'row' container spacing = {3}>
                <ListFreezerStock/>
            </Grid>
        </div>
    )
}

export default Dashboard;