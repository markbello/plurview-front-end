import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loader, Segment, List } from 'semantic-ui-react';
import { fetchShowRelatedArtists, fetchArtistSubGenres } from '../../apiAdapter';

class ArtistDetails extends Component {
  state = {
    relatedArtists: [],
    subGenres: [],
    loading: true
  };

  componentDidMount() {
    this.fetchRelatedArtists();
    this.fetchSubGenres();
  };

  fetchRelatedArtists = () => {
    fetchShowRelatedArtists(this.props.artist)
    .then(res => res.json())
    .then(relatedArtists => {
      const filteredRelatedArtists = relatedArtists.sort((a,b) => a.followers > b.followers).slice(0,4)
      this.setState({
        relatedArtists: filteredRelatedArtists,
        loading: false
      });
    });
  };

  fetchSubGenres = () => {
    fetchArtistSubGenres(this.props.artist)
    .then(res => res.json())
    .then(subGenres => {
      const filteredSubGenres = subGenres.filter((subGenre) => subGenre.name !== "edm").slice(0,4);
      this.setState({
        subGenres: filteredSubGenres,
        loading: false,
      });
    });
  };

  render() {
    const { loading, relatedArtists, subGenres } = this.state;

    return (
      <Fragment>
      {loading
        ? <Loader active inverted />
        : <Fragment>
          <Segment basic >
            {relatedArtists.length > 0
              ? <em>Related Artists:</em>
              : <div>
                  <em>Loading related artists...</em>
                </div>
            }
            {loading
              ? <Loader active inverted />
              : relatedArtists.map((artist, idx) =>
                  <Segment basic inverted key={`related-artist-${idx}`}>
                    {artist.name}
                    <div className={'secondary-gradient'} style={{background: `linear-gradient(to right, ${artist.hsl}) `}}/>
                  </Segment>
                )
            }
            {subGenres.length > 0
              ? <Fragment>
                  <em>Subgenres:</em>
                  <Segment basic inverted>
                    <List>
                      {subGenres.map((subGenre, idx) => <List.Item value={'-'} key={`subgenre-${idx}`} >{subGenre.name}</List.Item>)}
                    </List>
                  </Segment>
                </Fragment>
              : null
            }
          </Segment>
        </Fragment>
      }
    </Fragment>
    );
  };
};

ArtistDetails.propTypes = {
  artist: PropTypes.shape({}).isRequired,
};

export default ArtistDetails;
