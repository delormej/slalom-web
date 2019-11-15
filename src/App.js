import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SkiToolBar from './SkiToolBar';
import VideoList from './VideoList';
import AdminConsole from './AdminConsole';
import Login from './Login';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },    
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },  
  section2: {
    margin: theme.spacing(2),
  },
  avatar: {
    backgroundColor: 'lightgrey',
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
          <Link color="inherit" href="https://http://threeseasonski.com/">
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
    return <AdminConsole />
}

export default function App() {
  const [page, setPage] = useState("default");

  return (
    <React.Fragment>
      <CssBaseline />
      <SkiToolBar navigate={setPage} currentPage={page} />
      <Login />
      <ShowPage page={page} />
      <Footer />  
    </React.Fragment>
  );
}