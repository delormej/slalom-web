import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
    courseAndSpeed: {
      paddingBottom: theme.spacing(3),
    }
  }));
  
export default function VideoCard(props) {
    const video = props.video;
    const classes = useStyles();

    return (
        <Grid item key={props.card} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    title={video.recordedTime}
                    subheader={video.recordedDate}
                    avatar={
                        <Avatar className={classes.avatar}>
                        {video.avatarText}
                        </Avatar>
                    }                    
                    action={
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }>                    
                ]                  
                </CardHeader>                    
                <CardMedia
                    className={classes.cardMedia}
                    image={video.thumbnailUrl}
                    title="Video Thumbnail"
                />                
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={0} className={classes.courseAndSpeed}>
                        <Grid item xs={9}>
                            <Typography>
                                {video.courseName}
                            </Typography>             
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align="right">
                                {video.boatSpeedMph}&nbsp;mph
                            </Typography>             
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="skierName"
                                name="skierName"
                                label="Skier name"
                                fullWidth
                                autoComplete="fname"
                                value={video.skier}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="ropeLengthM">Rope Length</InputLabel>
                            <Select
                                fullWidth
                                value={video.ropeLengthM}
                                inputProps={{
                                    name: 'ropeLengthM',
                                    id: 'ropeLengthM',
                                }}>
                                <MenuItem value={15}>15' Off</MenuItem>
                                <MenuItem value={22}>22' Off</MenuItem>
                                <MenuItem value={28}>28' Off</MenuItem>
                                <MenuItem value={32}>32' Off</MenuItem>
                                <MenuItem value={35}>35' Off</MenuItem>
                                <MenuItem value={38}>38' Off</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={24} sm={12}>
                            <TextField
                                id="notes"
                                label="Notes"
                                fullWidth
                                multiline
                                rows="4"
                                value={video.notes}
                                className={classes.textField}
                            />                    
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    View
                    </Button>
                    <Button size="small" color="primary">
                    Edit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}