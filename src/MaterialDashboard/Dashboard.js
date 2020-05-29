import React from 'react';
import clsx from 'clsx';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, 
    Divider, IconButton, Container, Grid,
    Paper, Link} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import Orders from './Orders';
import { OrderDetails } from './OrderDetails';
import SummarisedComponent from "./Summary";

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

const drawerWidth = 240;

const useStyles = createStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const contentsType = {
    "DASHBOARD": "DASHBOARD",
    "SUMMARY": "SUMMARY"
};

class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.classes = props.classes;
        this.state = {
            open: true,
            showContent: "DASHBOARD",
            orders: [] 
        };
    
        this.fixedHeightPaper = clsx(this.classes.paper, this.classes.fixedHeight);
    }

    changeContentType = (contentType) => {
        console.log("contentType", contentType);
        this.setState({
            showContent: contentType
        });
    };
  
//   const [open, setOpen] = React.useState(true);
  handleDrawerOpen = () => {
    this.setState({
        open: true
      });
  };
  
  handleDrawerClose = () => {
      this.setState({
        open: false
      });
  };

  addNewOrder = (newOrder) => {
      this.setState((state) => {
          let orders = [];

          Object.assign(orders, state.orders);
          newOrder.id = orders.length + 1;
          orders.push(newOrder);
        
          return {orders};
      });
  };

  render(){
      const {showContent} = this.state;
    return (
        <div className={this.classes.root}>
          <CssBaseline />
          
            <AppBar position="absolute" className={clsx(this.classes.appBar, this.state.open && this.classes.appBarShift)}>
                <Toolbar className={this.classes.toolbar}>
                
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={clsx(this.classes.menuButton, this.state.open && this.classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>

                <Typography component="h1" variant="h6" color="inherit" noWrap className={this.classes.title}>
                    Dashboard
                </Typography>

                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>

                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(this.classes.drawerPaper, !this.state.open && this.classes.drawerPaperClose),
                }}
                open={this.state.open}
            >
                <div className={this.classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List >{mainListItems(this.changeContentType, contentsType)}</List>
            </Drawer>

            <main className={this.classes.content}>
                <div className={this.classes.appBarSpacer} />
                <Container maxWidth="lg" className={this.classes.container}>
                    <Grid container  spacing={3}>

                        {/* Dashboard */}
                        {showContent === contentsType.DASHBOARD &&
                        <>
                        <Grid xs={12} md={12} lg={12} item>
                            <Paper className={this.classes.paper}>
                                <Orders addNewOrder={this.addNewOrder} />
                            </Paper>
                        </Grid>

                        {this.state.orders.length !== 0 && 
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={this.classes.paper}>
                                <OrderDetails orders={this.state.orders} />
                            </Paper>
                        </Grid>}
                        </>
                        }

                        {showContent === contentsType.SUMMARY &&
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={this.fixedHeightPaper}>
                                <SummarisedComponent orders={this.state.orders} />
                            </Paper>
                        </Grid>}

                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
      );
  }
  
}

export default withStyles(useStyles)(Dashboard);
