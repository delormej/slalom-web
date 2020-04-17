import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Fullscreen from 'react-full-screen';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
    fullscreen: {
      backgroundColor: "cyan",
      color: "red"
    }
  }));

export default function VideoPlayer(props) {
    const [isFull, setFull] = useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <Button onClick={() => setFull(!isFull)}>Play</Button>                
            <Fullscreen style={{ display: isFull ? "block" : "none" }}
                    enabled={isFull}
                    onChange={isFull => setFull(isFull)}>
                {isFull ? 
                <div className="full-screenable-node" class={classes.fullscreen}>
                    Hi! This may cover the entire monitor.
                </div> : null }
            </Fullscreen>          

            <CardMedia
                className={classes.cardMedia}
                image="https://skivideostorage.blob.core.windows.net/ski/2019-10-26/GP012353.PNG"
                title={"Video Thumbnail: " + "https://skivideostorage.blob.core.windows.net/ski/2019-10-26/GP012353.PNG"}
            />
            <IconButton className={classes.overlay} title="Play Video"
              onClick={() => window.open("https://storage.googleapis.com/skivideo/2019-10-26/GP012353_1_ts.MP4")}>
              <PlayArrowIcon />
            </IconButton>                
        </React.Fragment>
    )
};