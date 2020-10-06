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
                    />
                    <TextField
                        required
                        label="Apt, Suite, etc. #"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <TextField
                        required
                        label="City"
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        required
                        label="State"
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        required
                        label="Zipcode"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserAddress);