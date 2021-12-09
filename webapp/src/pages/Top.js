
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
  MenuItem
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
  }
}));


const Top = () => {
  const [sendText, setSendText] = useState('');
  const [recvText, setRecvText] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const classes = useStyles();

  const onPressQuery = async (event) => {
    event.preventDefault();
    const res = await queryDiscovery(sendText, categoryId);
    setRecvText(res.data.responseText);
    console.log(res);
    // setSendText('');
  }

  const sampleItems = Array.from(Array(20).keys()).map(n => 
    <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minWidth: 575 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                belent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
            className={classes.input}
            placeholder="Watson Discovery で検索"
            inputProps={{ 'aria-label': 'search watson discovery' }}
            onChange={(e)=>{setSendText(e.target.value)}}
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
      <Grid container spacing={1} className={classes.cardGrid}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minWidth: 575 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                belent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
        {sampleItems}
      </Grid>
      <Container>
        <Grid>
          {recvText}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Top;