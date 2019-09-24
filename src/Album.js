import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SkiToolBar from './SkiToolBar';
import VideoCard from './VideoCard';
import VideoFilter from './VideoFilter';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        IRT, LLC.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function VideoList(props) {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {props.videos.map(video => (
            <VideoCard card={video} />
        ))}
      </Grid>
    </Container>
  );
}

function SkiFooter(props) {
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
      <Copyright />
    </footer>
  );
}

export default function Album() {
  return (
    <React.Fragment>
      <CssBaseline />
      <SkiToolBar />
      <VideoFilter videos={cards} />
      <VideoList videos={cards} />
      <SkiFooter />
    </React.Fragment>
  );
}