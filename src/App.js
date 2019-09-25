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
import Video from './Video';

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

function getVideos() {
  const videos = [{"url":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1903_ts.MP4","thumbnailUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1903.PNG","jsonUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1903_ts.json","skier":"Barak","ropeLengthM":22,"boatSpeedMph":32.5,"hasCrash":false,"all6Balls":false,"courseName":"cove","entryTime":25.525,"notes":null,"slalomTrackerVersion":null,"recordedTime":"2019-09-20T17:06:57Z","markedForDelete":false,"partitionKey":"2019-09-20","rowKey":"GOPR1903_ts.MP4","timestamp":"2019-09-21T14:52:21.3656249+00:00","eTag":"W/\"datetime'2019-09-21T14%3A52%3A21.3656249Z'\""},{"url":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1897_ts.MP4","thumbnailUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1897.PNG","jsonUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1897_ts.json","skier":null,"ropeLengthM":0.0,"boatSpeedMph":0.0,"hasCrash":false,"all6Balls":false,"courseName":"cove_reverse","entryTime":8.619,"notes":null,"slalomTrackerVersion":null,"recordedTime":"2019-09-20T16:42:01Z","markedForDelete":false,"partitionKey":"2019-09-20","rowKey":"GOPR1897_ts.MP4","timestamp":"2019-09-21T14:46:47.6765647+00:00","eTag":"W/\"datetime'2019-09-21T14%3A46%3A47.6765647Z'\""},{"url":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1896_ts.MP4","thumbnailUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1896.PNG","jsonUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1896_ts.json","skier":null,"ropeLengthM":0.0,"boatSpeedMph":0.0,"hasCrash":false,"all6Balls":false,"courseName":"cove_reverse","entryTime":15.571,"notes":null,"slalomTrackerVersion":null,"recordedTime":"2019-09-20T16:39:16Z","markedForDelete":false,"partitionKey":"2019-09-20","rowKey":"GOPR1896_ts.MP4","timestamp":"2019-09-21T14:44:30.4777844+00:00","eTag":"W/\"datetime'2019-09-21T14%3A44%3A30.4777844Z'\""},{"url":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1895_ts.MP4","thumbnailUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1895.PNG","jsonUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1895_ts.json","skier":null,"ropeLengthM":0.0,"boatSpeedMph":0.0,"hasCrash":false,"all6Balls":false,"courseName":"cove_reverse","entryTime":21.743,"notes":null,"slalomTrackerVersion":null,"recordedTime":"2019-09-20T16:35:59Z","markedForDelete":false,"partitionKey":"2019-09-20","rowKey":"GOPR1895_ts.MP4","timestamp":"2019-09-21T14:46:38.6290081+00:00","eTag":"W/\"datetime'2019-09-21T14%3A46%3A38.6290081Z'\""},{"url":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1893_ts.MP4","thumbnailUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1893.PNG","jsonUrl":"https://skivideostorage.blob.core.windows.net/ski/2019-09-20/GOPR1893_ts.json","skier":"Jason","ropeLengthM":15.0,"boatSpeedMph":30.4,"hasCrash":false,"all6Balls":false,"courseName":"outside_reverse","entryTime":18.962,"notes":null,"slalomTrackerVersion":null,"recordedTime":"2019-09-20T16:22:47Z","markedForDelete":false,"partitionKey":"2019-09-20","rowKey":"GOPR1893_ts.MP4","timestamp":"2019-09-21T14:51:40.1548488+00:00","eTag":"W/\"datetime'2019-09-21T14%3A51%3A40.1548488Z'\""}];
  return videos;
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

const cards = getVideos(); 

function VideoList(props) {
  const classes = useStyles();
  let i = 0;
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {props.videos.map(video => (
            <Video video={video} key={i++} />
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

export default function App() {
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