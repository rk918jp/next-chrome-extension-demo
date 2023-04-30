import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

const Home = () => {
  return (
      <>
        <Box sx={{width: "500px"}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Next Chrome Extension Demo
              </Typography>
            </Toolbar>
          </AppBar>
          <Box>
            <Button>
              click me
            </Button>
          </Box>
        </Box>
      </>
  )
}

export default Home;