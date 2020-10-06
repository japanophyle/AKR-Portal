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

  const [address_1, setAddressOne] = useState('Address block 1');
  const [address_2, setAddressTwo] = useState('Address block 2');
  const [state, setState] = useState('City');
  const [city, setCity] = useState('State');
  const [zipcode, setZipcode] = useState('Zipcode');
  const [country, setCountry] = useState('Country');

  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  const handleAddressOne = (event) => {
    setAddressOne(event.target.value)
  }
  const handleAddressTwo = (event) => {
    setAddressTwo(event.target.value)
  }
  const handleState = (event) => {
    setState(event.target.value)
  }
  const handleCity = (event) => {
    setCity(event.target.value)
  }
  const handleZip = (event) => {
    setZipcode(event.target.value)
  }
  const handleCountry = (event) => {
    setCountry(event.target.value)
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
                    defaultValue={address_1}
                    variant="outlined"
                    onChange={handleAddressOne}
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="address_2"
                    label="Address line 2"
                    defaultValue={address_2}
                    variant="outlined"
                    onChange={handleAddressTwo}
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="country"
                    label="Country"
                    defaultValue={country}
                    variant="outlined"
                    onChange={handleCountry}

                  />
                  <TextField
                    required
                    id="state"
                    label="State"
                    defaultValue="asdf"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="city"
                    label="City"
                    defaultValue="karl"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="zipcode"
                    label="Zipcode"
                    defaultValue="55104"
                    variant="outlined"
                  />
                  <h3>Address block 1</h3>
                  <h3>Address block 2</h3>
                  <h3>City, State, Zipcode, Country</h3>
                </Typography>
              </CardContent>
            </Card>
          }
    </div>
  );
}

export default connect(mapStoreToProps)(UserAddress);
