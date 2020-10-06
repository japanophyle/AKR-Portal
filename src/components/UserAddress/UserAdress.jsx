import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserAddress(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [nameEdit, toggleNameEdit] = useState(true);

  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

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
                  <TextField
                    required
                    id="country"
                    label="Country"
                    defaultValue={props.store.info.country}
                    variant="outlined"
                    onChange={handleEditChange}

                  />
                  <TextField
                    required
                    id="state"
                    label="State"
                    defaultValue={props.store.info.state}
                    variant="outlined"
                    onChange={handleEditChange}
                  />
                  <TextField
                    required
                    id="city"
                    label="City"
                    defaultValue={props.store.info.city}
                    variant="outlined"
                    onChange={handleEditChange}
                  />
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
asdfasdfasdfasdfsadf
export default connect(mapStoreToProps)(UserAddress);
