
import React, {useState} from 'react';
import Layout from '../components/layout/Layout';

import {
  makeStyles,
  Grid,
  Container,
  IconButton,
  Paper,
  InputBase,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  Link
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { queryDiscovery }from '../utils/index';
import { discoveryCategories } from '../utils/discoveryCategories';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    marginRight: '20px',
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    width: '100%',
    margin: 4,
  },
  grid: {
    marginTop: '48px',
    width: '100',
  },
  cardGrid: {
    padding: '2px 12px 2px 12px'
  },
  noResultContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
  },
  circularLoadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  detailText: {
    padding: '16px',
  }
}));


const Top = () => {
  const [sendText, setSendText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const classes = useStyles();

  const onPressQuery = async (event) => {
    event.preventDefault();
    setHasSearched(true);
    setSearchedText(sendText);
    setIsSearching(true);
    return queryDiscovery(sendText, categoryId)
      .then((result) => { 
      setIsSearching(false);
      Array.isArray(result.data.responseText) ?
        setSearchResults(result.data.responseText) :
        setSearchResults([]);
      });
  }

  const openDetailDialog = () => setIsDetailOpen(true);
  const closeDetailDialog = () => setIsDetailOpen(false);

  const sampleItems = Array.from(Array(20).keys()).map(n => 
    <Grid item xs={12} sm={6} md={3} key={n}>
          <Card sx={{ minWidth: 575 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                belent
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
    );

  const renderSearchResults = () => {
    if(!hasSearched) {
      return null;
    }
    if(isSearching) {
      return (
      <Container className={classes.circularLoadContainer}>
        <CircularProgress />
      </Container>
      );
    }
    if(searchResults.length === 0) {
      return (
        <Container className={classes.noResultContainer}>
          <Typography variant="body1" component="div">
            {`${searchedText} に一致する情報は見つかりませんでした。`}
          </Typography>
        </Container>
      );
    }
    const keys = {index: 0};
    return searchResults.map(e => {
      const { title, description, filename} = e;
      return (
        <>
          <Grid item xs={12} sm={6} md={3} key={keys.index++}>
            <Card sx={{ minWidth: 575 }}>
              <CardContent style={{textAlign: "left"}}>
                <Link component="button" underline="always" className={classes.cardTitle} onClick={openDetailDialog}>
                  {title}
                </Link>
                <Typography variant="body2">
                  {`${description.substring(0, 100)}...`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://github.com/cloud-native-garage-method-japan-cohort/team-gemini/blob/master/resources/${filename}`, '_blank');
                  }}
                >
                  Open Document
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Dialog onClose={closeDetailDialog} aria-labelledby="detail-dialog" open={isDetailOpen}>
            <DialogTitle id="detail-dialog">{title}</DialogTitle>
            <Typography variant="body1" component="p" className={classes.detailText}>{description}</Typography>
          </Dialog>
        </>
      )
    });
  }

  return (
    <Layout>
      <form onSubmit={(e)=>{onPressQuery(e)}} className={classes.form}>
        <FormControl variant="outlined" className={classes.select}>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <MenuItem value={0}>カテゴリを選択</MenuItem>
            {discoveryCategories.map(([id, label]) => (
              <MenuItem value={id}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Paper className={classes.inputContainer}>
          <InputBase
            value={sendText}
            className={classes.input}
            placeholder="Watson Discovery で検索"
            inputProps={{ 'aria-label': 'search watson discovery' }}
            onChange={(e)=>{setSendText(e.target.value)}}
            onClick={() => sendText === "" ? setSendText("IBM") : null}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <Grid container spacing={1} className={classes.cardFilename}>
        {renderSearchResults()}
      </Grid>
    </Layout>
  )
}

export default Top;