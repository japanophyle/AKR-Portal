import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserAddress(props) {

  // State used to toggle the edit button on and off
  const [nameEdit, toggleNameEdit] = useState(true);

  // function used to toggle edit and non edit views
  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  // function that dispatches to the edit reducer whenever an edit is made to an input
  const handleEditChange = (event) => {
    console.log(`Handle change of ${event.target.id}`);
    props.dispatch(
      {
        type: 'SET_EDIT',
        payload: { key: event.target.id, value: event.target.value }
      });
  }

  return (
    <div>
      {/* IF the state is true this a just a view of information */}
      {nameEdit ?
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Address</h1>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleDateChange}>Edit</Button>
              </Grid>
            </Grid>
            <Typography>
              <h3>Address block 1</h3>
              <h3>Address block 2</h3>
              <h3>City, State, Zipcode, Country</h3>
            </Typography>
          </CardContent>
        </Card>
        :
        <Card>
          {/* IF the state is FALSE this You can edit */}
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Address</h1>
              </Grid>
              <Grid item xs={1}>
                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                <Button onClick={handleDateChange}>Save</Button>
                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                <Button onClick={handleDateChange}>Cancel</Button>
              </Grid>
            </Grid>
            <Typography>
              {/* Address 1  */}
              <TextField
                required
                id="address_1"
                label="Address line 1"
                defaultValue={props.store.info.address_1}
                variant="outlined"
                onChange={handleEditChange}
              />
              <br />
              <br />
              {/* Address 2 */}
              <TextField
                required
                id="address_2"
                label="Address line 2"
                defaultValue={props.store.info.address_2}
                variant="outlined"
                onChange={handleEditChange}
              />
              <br />
              <br />
              {/* Country */}
              <TextField
                required
                id="country"
                label="Country"
                defaultValue={props.store.info.country}
                variant="outlined"
                onChange={handleEditChange}

              />
              {/* State */}
              <TextField
                required
                id="state"
                label="State"
                defaultValue={props.store.info.state}
                variant="outlined"
                onChange={handleEditChange}
              />
              {/* City */}
              <TextField
                required
                id="city"
                label="City"
                defaultValue={props.store.info.city}
                variant="outlined"
                onChange={handleEditChange}
              />
              {/* Zipcode */}
              <TextField
                required
                id="zipcode"
                label="Zipcode"
                defaultValue={props.store.info.zipcode}
                variant="outlined"
                onChange={handleEditChange}
              />
            </Typography>
          </CardContent>
        </Card>
      }
    </div>
  );
}
export default connect(mapStoreToProps)(UserAddress);