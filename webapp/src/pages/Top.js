
import React, {useState} from 'react';
import Layout from '../components/layout/Layout';

import { makeStyles, Grid, Container, IconButton, Paper, InputBase, Card, CardActions, CardContent, Button, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import { queryDiscovery }from '../utils/index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    marginBottom: '20px',
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

  const classes = useStyles();

  const onPressQuery = async (event) => {
    event.preventDefault();
    const res = await queryDiscovery(sendText);
    setRecvText(res.data.responseText);
    console.log(res);
    // setSendText('');
  }

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

  return (
    <Layout>
      <form onSubmit={(e)=>{onPressQuery(e)}}>
        <Paper className={classes.root}>
          <InputBase
            value={sendText}
            className={classes.input}
            placeholder="Watson Discovery で検索"
            inputProps={{ 'aria-label': 'search watson discovery' }}
            onChange={(e)=>{setSendText(e.target.value)}}
            onClick={() => sendText === "" ? setSendText("Watson Discovery") : null}
          />
          <IconButton 
            type="button"
            className={classes.iconButton}
            aria-label="search"
            onClick={(e) => onPressQuery(e)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <Grid container spacing={1} className={classes.cardGrid}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minWidth: 575 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
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