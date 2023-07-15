//customstatuses.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var CustomStatuses = exports.CustomStatuses = function (options) {
  this.jsonAPINames = [ 'custom_statuses', 'custom_status' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(CustomStatuses, Client);

// ######################################################## Ticket Fields
// ====================================== Listing Custom Statuses
CustomStatuses.prototype.list = function (cb) {
  return this.requestAll('GET', ['custom_statuses'], cb);//all
};


// ====================================== Viewing Custom Statuses
CustomStatuses.prototype.show = function (customStatusID, cb) {
  return this.request('GET', ['custom_statuses', customStatusID], cb);
};

// ====================================== Creating Custom Statuses
CustomStatuses.prototype.create = function (ticketField, cb) {
  return this.request('POST', ['custom_statuses'], ticketField,  cb);
};

// ====================================== Updating Custom Statuses
CustomStatuses.prototype.update = function (customStatusID, ticketField, cb) {
  return this.request('PUT', ['custom_statuses', customStatusID], ticketField,  cb);
};

// ====================================== Deleting Custom Statuses
CustomStatuses.prototype.delete = function (customStatusID, cb) {
  return this.request('DELETE', ['custom_statuses', customStatusID],  cb);
};

