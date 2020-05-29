import dateFormat from 'dateformat';

export default {
  // remoteURL: 'http://localhost:8000/?rest_route=/wpws/v1',
  remoteURL: '/?rest_route=/wpws/v1',
  mockTimeout: 0,
  name: 'wpws',
  shortcode: 'wpws',
  formatDate: (now) => dateFormat(now, 'mm/dd/yy hh:MM'),
};
