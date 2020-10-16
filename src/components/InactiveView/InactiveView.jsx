import { Card, Container, Button, Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InactiveView(props) {
  useEffect(() => {
    props.dispatch({
      type: "FETCH_USER_INFO",
      payload: "user"
    })
    props.dispatch({
      type: "GET_DOJOS",
    })
  }, []);

  const [heading, setHeading] = useState('Currently Inactive');
  console.log('Inactive Page');
  return (
    <div>
      <Container>
        <Card height="300px" align="center">
          <h1>{heading}</h1>
          <h3>Please contact your local Dojo to be approved as an active member.</h3>



          <Grid container>
            <Grid item xs={12} align="center">
              {!props.store.info.id &&
                <Typography variant="overline" display="block">
                  If you haven't filled out your information please do that before you can be activated.
                </Typography>
              }
            </Grid>
            <Grid item xs={12} align="center">
              {!props.store.info.id &&
                <Button
                  style={{ margin: 25 }}
                  variant="outlined"
                  color="primary"
                  onClick={() => props.history.push('/new-user-registration')}
                >
                  Registration Form
            </Button>
              }
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}

export default connect(mapStoreToProps)(InactiveView);