import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
    Grid,
    TextField,
} from '@material-ui/core';


function NewUserAddress(props) {

    const [heading, setHeading] = useState('Address');



    return (
        <div>
            <h3>{heading}</h3>
            <Grid container>
                <Grid item>
                    <TextField
                        required
                        label="Address 1"
                        margin="dense"
                        variant="outlined"
                        name="address_1"
                        onChange={props.handleChange('address_1')}
                    />
                    <TextField
                        
                        label="Apt, Suite, etc. #"
                        margin="dense"
                        variant="outlined"
                        name="address_2"
                        onChange={props.handleChange('address_2')}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={8}>
                    <TextField
                        required
                        label="City"
                        margin="dense"
                        variant="outlined"
                        name="city"
                        onChange={props.handleChange('city')}
                    />
                    <TextField
                        required
                        label="State"
                        margin="dense"
                        variant="outlined"
                        name="state"
                        onChange={props.handleChange('state')}
                    />
                    <TextField
                        required
                        label="Zipcode"
                        margin="dense"
                        variant="outlined"
                        name="zipcode"
                        onChange={props.handleChange('zipcode')}
                    />
                    <TextField
                        label="Country"
                        margin="dense"
                        variant="outlined"
                        name="country"
                        onChange={props.handleChange('country')}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserAddress);