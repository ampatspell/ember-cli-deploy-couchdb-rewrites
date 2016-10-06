# ember-cli-deploy-couchdb-rewrites

Unshifts defined rewrites in `rewrites.json` created by `ember-cli-deploy-couchdb`.

``` javascript
// deploy.js
/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    couchdb: {
      db: 'http://...@localhost:5984/foof'
    },
    rewrites: {
      top: [
        { from: 'api', to: '../..' },
        { from: 'api/*', to: '../../*' }
      ]
    },
    build: {
      environment: 'production'
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
  }

  if (deployTarget === 'production') {
    ENV.couchdb.db = 'http://...@remotehost.com:5984/foof';
  }

  return ENV;
};
```
