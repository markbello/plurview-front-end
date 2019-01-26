import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loader, Segment, List } from 'semantic-ui-react';
import { fetchShowRelatedArtists, fetchArtistSubGenres } from '../../apiAdapter';

class ArtistDetails extends Component {
  state = {
    relatedArtists: [],
    subGenres: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchRelatedArtists();
    this.fetchSubGenres();
  }

  fetchRelatedArtists = () => {
    const { artist } = this.props;
    fetchShowRelatedArtists(artist)
      .then(res => res.json())
      .then((relatedArtists) => {
        const rankedRelatedArtists = relatedArtists.sort((a, b) => a.followers > b.followers);
        const truncatedRelatedArtists = rankedRelatedArtists.slice(0, 4);

        this.setState({
          relatedArtists: truncatedRelatedArtists,
          loading: false,
        });
      });
  };

  fetchSubGenres = () => {
    const { artist } = this.props;
    fetchArtistSubGenres(artist)
      .then(res => res.json())
      .then((subGenres) => {
        const filteredSubGenres = subGenres.filter(subGenre => subGenre.name !== 'edm').slice(0, 4);
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
          ? <Loader active={true} inverted={true} />
          : (
            <Fragment>
              <Segment basic={true}>
                {relatedArtists.length > 0
                  ? <em>Related Artists:</em>
                  : (
                    <div>
                      <em>Loading related artists...</em>
                    </div>
                  )
            }
                {loading
                  ? <Loader active={true} inverted={true} />
                  : relatedArtists.map(artist => (
                    <Segment basic={true} inverted={true} key={`related-artist-${artist.name}`}>
                      {artist.name}
                      <div className="secondary-gradient" style={{ background: `linear-gradient(to right, ${artist.hsl}) ` }} />
                    </Segment>
                  ))
            }
                {subGenres.length > 0
                  ? (
                    <Fragment>
                      <em>Subgenres:</em>
                      <Segment basic={true} inverted={true}>
                        <List>
                          {subGenres.map(subGenre => <List.Item value="-" key={`subgenre-${subGenre.name}`}>{subGenre.name}</List.Item>)}
                        </List>
                      </Segment>
                    </Fragment>
                  )
                  : null
            }
              </Segment>
            </Fragment>
          )
      }
      </Fragment>
    );
  }
}

ArtistDetails.propTypes = {
  artist: PropTypes.shape({}).isRequired,
};

export default ArtistDetails;
