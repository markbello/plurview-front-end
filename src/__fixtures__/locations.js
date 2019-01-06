import { find } from 'lodash';
import { ALL_LOCATIONS } from '../common/locations';

export const PHILADELPHIA_ID = 79;
export const PHILADELPHIA_OBJECT = find(ALL_LOCATIONS, { 'id': PHILADELPHIA_ID });
