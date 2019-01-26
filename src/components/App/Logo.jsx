import React from 'react';
import { Image, Segment, Grid } from 'semantic-ui-react';
import logoImage from '../../assets/ticket-logo.svg';

const Logo = () => (
  <Grid.Row centered={true} style={{ width: '100vw' }} colums={1}>
    <Grid.Column>
      <Segment basic={true} padded={true}>
        <Image className="logo-image" src={logoImage} size="medium" centered={true} verticalAlign="middle" style={{ display: 'flex' }} />
      </Segment>
    </Grid.Column>
  </Grid.Row>
);

export default Logo;
