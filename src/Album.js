import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import DatePicker from './DatePicker';
import SkierPicker from './SkierPicker';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import VideoCard from './VideoCard';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
  filter: {
    paddingTop: theme.spacing(6),
  },
  videoCount: {
    marginLeft: '30px',
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  donateButton: {
      
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <img src="waterskiierd2.png" alt="3 Season Ski logo" width="60" height="60" className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            3 Season Ski Club
          </Typography>
          <span className={classes.toolbarButtons}>
            <Button className={classes.donateButton} color="inherit">Donate</Button>
          </span>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container maxWidth="md" className={classes.filter}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={6}><DatePicker /> </Grid>
                    <Grid item xs={6}><SkierPicker /></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h7" color="textSecondary" className={classes.videoCount}>
                            655 Videos
                        </Typography>
                    </Grid>                    
                </Grid>
            </Paper>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
                <VideoCard card={card} />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}