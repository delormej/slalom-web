import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    toolbarButtons: {
        marginLeft: "auto",
        marginRight: -12
    },
        icon: {
        marginRight: theme.spacing(2),
    },  
        donateButton: {     
    }
}));

export default function SkiMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = () => {
    handleClose();
    props.navigate("admin");
  };

  const handleVideoLog = () => {
    handleClose();
    props.navigate("default");
  };  

  const handleDonate = () => {
    handleClose();
    window.open('http://www.threeseasonski.com/About_Us.html');      
  }

  return (
    <span className={classes.toolbarButtons}>
      <IconButton edge="end" color="inherit" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </IconButton>     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDonate}>Donate</MenuItem>
        { props.currentPage === "default" ?
            <MenuItem onClick={handleAdmin}>Admin Console</MenuItem> :
            <MenuItem onClick={handleVideoLog}>Video Log</MenuItem>
        }
      </Menu>
    </span>
  );
}