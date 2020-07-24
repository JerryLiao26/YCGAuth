import AuthDB from './db';

const db = new AuthDB({
  type: 'MongoDB',
  dbHost: 'localhost',
  dbPort: 27017,
  dbName: 'YuChiGong',
  dbPass: '',
  dbUser: '',
});

db.connect();
