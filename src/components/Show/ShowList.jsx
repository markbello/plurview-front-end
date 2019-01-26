import React, { Fragment } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  filterDatesByValidShows,
  filterShowsByDaysOfWeek,
} from '../../utils/filters';
import Show from './Show';

const ShowList = ({
  activeLocationName,
  allArtists,
  isWeekendsOnly,
  shows: allShows,
}) => {
  const availableDaysToShow = filterShowsByDaysOfWeek(allShows, isWeekendsOnly);
  const datesWithValidShows = filterDatesByValidShows(availableDaysToShow, allArtists);

  return (
    <Fragment>
      <Fragment>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={11}>
            <Header inverted={true} as="h2" textAlign="center">
                Upcoming Events -
              {activeLocationName}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Fragment>

      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column>
          <Segment basic={true}>
            <Grid stackable={true}>
              {datesWithValidShows.map(({ formattedDate, shows }) => (
                <Grid.Row>
                  <Segment.Group>
                    <Segment basic={true}>
                      <Header inverted={true} as="p"><em>{formattedDate}</em></Header>
                    </Segment>
                    <Segment.Group>
                      {shows.map(show => (
                        <Show
                          ages={show.ages}
                          allArtists={allArtists}
                          artistList={show.artistList}
                          isFestival={show.festivalInd}
                          key={`show-${show.name}`}
                          location={show.venue.location}
                          name={show.name}
                          ticketLink={show.ticketLink}
                          venueName={show.venue.name}
                        />
                      ))}
                    </Segment.Group>
                  </Segment.Group>
                </Grid.Row>
              ))}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
};


ShowList.propTypes = {
  activeLocationName: PropTypes.string.isRequired,
  allArtists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isWeekendsOnly: PropTypes.bool.isRequired,
  shows: PropTypes.shape({
    ages: PropTypes.string,
    artistList: PropTypes.array.isRequired,
    isFestival: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ticketLink: PropTypes.string.isRequired,
    venueName: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowList;
