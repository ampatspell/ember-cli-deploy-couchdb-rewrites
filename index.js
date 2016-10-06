/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-cli-deploy-couchdb-rewrites',
  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: 'rewrites',

      defaultConfig: {
        couchDir: function(context) {
          return context.couchDir || 'tmp/deploy-dist';
        },
        top: function(context) {
          return context.top || [];
        }
      },

      willUpload: function(context) {
        var couchDir = this.readConfig('couchDir');
        var top = this.readConfig('top');
        let filename = path.join(couchDir, 'rewrites.json');
        let rewrites = JSON.parse(fs.readFileSync(filename));
        rewrites.unshift.apply(rewrites, top);
        fs.writeFileSync(filename, JSON.stringify(rewrites));
      }
    });
    return new DeployPlugin();
  }
};
