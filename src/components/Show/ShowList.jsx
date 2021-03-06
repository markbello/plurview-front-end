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
  shows,
}) => {
  const availableDaysToShow = filterShowsByDaysOfWeek(shows, isWeekendsOnly);
  const datesWithValidShows = filterDatesByValidShows(availableDaysToShow, allArtists);

  return (
    <Fragment>
      <Fragment>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={11}>
            <Header inverted as='h2' textAlign='center'>Upcoming Events - {activeLocationName}</Header>
          </Grid.Column>
        </Grid.Row>
      </Fragment>

      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column>
          <Segment basic >
            <Grid stackable>
              {datesWithValidShows.map(({ formattedDate, shows }) => (
                <Grid.Row >
                    <Segment.Group>
                      <Segment basic>
                        <Header inverted as={'p'} ><em>{formattedDate}</em></Header>
                      </Segment>
                      <Segment.Group>
                        {shows.map((show, idx) => (
                          <Show
                            ages={show.ages}
                            allArtists={allArtists}
                            artistList={show.artistList}
                            isFestival={show.festivalInd}
                            key={`showArtist-${idx}`}
                            location={show.venue.location}
                            name={show.name}
                            ticketLink={show.ticketLink}
                            venueName={show.venue.name}
                          />))}
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
  shows: PropTypes.shape({
    ages: PropTypes.string,
    artistList: PropTypes.array.isRequired,
    isFestival: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ticketLink: PropTypes.string.isRequired,
    venueName: PropTypes.string.isRequired,
  }),
  locationName: PropTypes.string.isRequired,
}

export default ShowList;
