import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SkiToolBar from './SkiToolBar';
import VideoList from './VideoList';
import AdminConsole from './AdminConsole';
import Login from './Login';
import ErrorBoundry from './ErrorBoundry';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },  
}));

function Footer() {
  const classes = useStyles();
  const env = process.env.NODE_ENV;
  const version = process.env.REACT_APP_VERSION;

  return (
    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          South Pond of Lake Cochituate, Natick MA
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Env: {env}, Version: {version}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="http://www.threeseasonski.com/">
            Three Season Ski Club
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    </footer>    
  );
}

function ShowPage(props) {
  const page = props.page;

  if (page === "default")
    return <VideoList />
  else if (page === "admin")
    return <AdminConsole accessToken={props.accessToken} />
}

export default function App() {
  const [page, setPage] = useState("default");
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  function OnAuthenticate(response) {
    console.log("OnAuthenticate: " + response.userID);
    console.log("OnAuthenticate: " + response.accessToken);
    if (response.userID && response.accessToken) {
      setUserId(response.userID);
      setAccessToken(response.accessToken);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <SkiToolBar navigate={setPage} currentPage={page} userId={userId} />
      <ErrorBoundry>      
        <ShowPage page={page} accessToken={accessToken} />
        <Footer />  
        <Login OnAuthenticate={OnAuthenticate} />
      </ErrorBoundry>
    </React.Fragment>
  );
}