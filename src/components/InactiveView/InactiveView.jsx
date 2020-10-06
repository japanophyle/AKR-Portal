import { Card, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InactiveView(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Currently Inactive');

  return (
    <div>
        <Container>
            <Card height="300px" align="center">
      <h1>{heading}</h1>
      <h3>Please contact your local Dojo to be approved as an active member.</h3>
            </Card>
        </Container>  
    </div>
  );
}

export default connect(mapStoreToProps)(InactiveView);