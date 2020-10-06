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
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        required
                        label="Address 1"
                        margin="dense"
                        variant="outlined"
                        name="address_1"
                        onChange={props.handleChange('address_1')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Apt, Suite, etc. #"
                        margin="dense"
                        variant="outlined"
                        name="address_2"
                        onChange={props.handleChange('address_2')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item>
                    <TextField
                        required
                        label="City"
                        margin="dense"
                        variant="outlined"
                        name="city"
                        onChange={props.handleChange('city')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        label="State"
                        margin="dense"
                        variant="outlined"
                        name="state"
                        onChange={props.handleChange('state')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        label="Zipcode"
                        margin="dense"
                        variant="outlined"
                        name="zipcode"
                        onChange={props.handleChange('zipcode')}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: -8}}>
                    <TextField
                        required
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