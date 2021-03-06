import React, { Fragment } from 'react'
import { isEmpty } from 'lodash';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Artist from '../Artist/Artist';
import ticketImage from '../../assets/ticket.svg';

const Show = ({
  ages,
  allArtists,
  artistList,
  isFestival,
  location,
  name,
  ticketLink,
  venueName,
}) => {
  const formattedLocation = ages ? `${location} (${ages})` : location;

  const hasName = !!name;
  const formattedName = isFestival
    ? `${name} - Festival`
    : name;

  const artistMatchesFromDB = [];
  artistList.forEach(artist => {
    const artistMatch = allArtists.find(dbArtist => dbArtist.name === artist.name);
    !!artistMatch && artistMatchesFromDB.push(artistMatch);
  });

  const hasArtistsFromDB = !isEmpty(artistMatchesFromDB);

  return hasArtistsFromDB && (
    <Fragment>
      <Segment basic inverted>
        <Header className={'show-location'} as={"h2"}>
          <em>{venueName}</em>
          <a href={ticketLink}>
            <Image className={'ticket-link'} src={ticketImage} size='mini' verticalAlign='middle' />
          </a>
        </Header>
        <em className={'show-location'}>{formattedLocation}</em>
      </Segment>
      <Grid container columns={1} inverted stackable>
        <Grid.Column className={'artist-column'}>
          {hasName && (
            <Segment basic inverted as={'div'} className={'show-component'}>
              <Header as={'p'}><em>{formattedName}</em></Header>
            </Segment>
          )}
          {artistMatchesFromDB.map(artist => <Artist artist={artist} />)}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

Show.propTypes = {
  ages: PropTypes.string,
  artistList: PropTypes.array.isRequired,
  allArtists: PropTypes.array.isRequired,
  isFestival: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ticketLink: PropTypes.string.isRequired,
  venueName: PropTypes.string.isRequired,
};

export default Show;
