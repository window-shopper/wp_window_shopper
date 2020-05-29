import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FuzzySearch from 'fuzzy-search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '../../../../components/TextField';
import ImageLoader from './ImageLoader';
import {
  selectState,
  setImage,
} from '../../editorSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const Subt = ({ subtitle }) => (
  <span>
    upload:
    {' '}
    {subtitle}
  </span>
);

export default function AdvancedGridList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [numberOfResults, setNumberOfResults] = useState(50);
  const { image } = useSelector(selectState);

  return (
    <div style={{ paddingTop: 10 }}>
      <Divider style={{ margin: '15px -24px' }} />
      <Typography style={{ fontSize: 20 }}>From My Library</Typography>
      <div style={{ display: 'flex' }}>
        <TextField label="Search" style={{ marginBottom: 15, flex: 2, marginRight: 5 }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <FormControl style={{ flex: 1.3 }} className={classes.formControl}>
          <InputLabel>displayed results</InputLabel>
          <Select
            value={numberOfResults}
            onChange={(e) => setNumberOfResults(e.target.value)}
          >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Paper elevation={3} className={classes.root}>
        <ImageLoader>
          {(allImages) => {
            const searcher = new FuzzySearch(allImages, ['post_title', 'post_date'], {
              caseSensitive: false,
            });
            const images = searcher.search(searchText).slice(0, numberOfResults);
            return (
              <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {images.map((_image) => (
                  <GridListTile key={_image.ID} cols={1} rows={1}>
                    <ButtonBase
                      onClick={() => dispatch(setImage({ ...image, alt: _image.post_title, url: _image.guid }))}
                      focusRipple
                      style={{ width: '100%' }}
                    >
                      <img style={{ width: '100%', height: 200, objectFit: 'cover' }} src={_image.guid} alt={_image.post_title} />
                      <GridListTileBar
                        title={_image.post_title}
                        subtitle={<Subt subtitle={_image.post_date} />}
                      />
                    </ButtonBase>
                  </GridListTile>
                ))}
              </GridList>
            );
          }}
        </ImageLoader>
      </Paper>
    </div>
  );
}
