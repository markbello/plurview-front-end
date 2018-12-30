import moment from 'moment';
import { isEmpty } from 'lodash';

export const filterShowsByDaysOfWeek = (shows, isWeekendsOnly) => {
  const WEEKEND_DAYS = ['0', '5', '6'];
  const ALL_DAYS =  ['0', '1', '2', '3', '4', '5', '6'];

  const daysOfWeekToShow = isWeekendsOnly
    ? WEEKEND_DAYS
    : ALL_DAYS;

  const allDatesWithShows = Object.keys(shows);

  const filteredDatesWithShows = allDatesWithShows.filter(day => {
    const formattedDay = moment(day).format('d');
    return daysOfWeekToShow.includes(formattedDay);
  });

  const filteredDatesToShow = filteredDatesWithShows.map(date => ({
    shows: [ ...shows[date] ],
    formattedDate: moment(date).format('dddd, MMMM Do'),
  }));

  return filteredDatesToShow;
};

export const filterDatesByValidShows = (dates, allArtists) => {
  const processedDates = dates.map(date => {
    const { shows } = date;

    const processedShows = shows.map(show => {
      const processedShow = parseArtistDataFromDB(show, allArtists);
      const isShowValid = !isEmpty(processedShow.artistList);
      return isShowValid ? processedShow : false;
    });

    const validShowsForDate = processedShows.filter(show => !!show);
    const processedDate = {
      ...date,
      shows: validShowsForDate,
    };
    const isDateValid = !isEmpty(processedDate.shows);

    return isDateValid ? processedDate : false;
  });

  const datesWithValidShows = processedDates.filter(date => !!date);

  return datesWithValidShows;
};

const matchArtistsFromDB = (artistList, allArtists) => {
  const artistMatchesFromDB = [];

  artistList.forEach(artist => {
    const artistMatch = allArtists.find(dbArtist => dbArtist.name === artist.name);
    !!artistMatch && artistMatchesFromDB.push(artistMatch);
  });

  return artistMatchesFromDB;
};

const parseArtistDataFromDB = (show, allArtists) => {
  const artistsFromDB = matchArtistsFromDB(show.artistList, allArtists);

  const showWithDBArtists = {
    ...show,
    artistList: artistsFromDB,
  };

  return showWithDBArtists;
};
