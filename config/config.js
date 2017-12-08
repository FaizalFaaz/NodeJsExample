
module.exports = {
mongodb: 'mongodb://test:12345@ds019906.mlab.com:19906/assignment2comp2068',
//mongodb: 'mongodb://localhost/exam',

  session_secret: 'foobar',
  oauth_credentials: {
    facebook: {
      clientID: '1694474314184730',
      clientSecret: '4304daf34f553257299cce66c26da182',
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
  }
}
