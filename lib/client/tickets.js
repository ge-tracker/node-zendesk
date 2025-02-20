//tickets.js: Client for the zendesk API.


var util = require('util'),
  Client = require('./client').Client;

var Tickets = exports.Tickets = function (options) {
  this.jsonAPINames = ['tickets', 'ticket', 'audits', 'comments'];
  this.sideLoadMap = [
    { field: 'assignee_id', name: 'assignee', dataset: 'users' },
    { field: 'requester_id', name: 'requester', dataset: 'users' },
    { field: 'submitter_id', name: 'submitter', dataset: 'users' },
    { field: 'organization_id', name: 'organization', dataset: 'organizations' },
    { field: 'id', name: 'sharing_agreements', dataset: 'sharing_agreements' },
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Tickets, Client);

// ######################################################## Tickets
// ====================================== Listing Tickets
Tickets.prototype.list = function (cb) {
  return this.requestAll('GET', ['tickets'], cb);//all
};

Tickets.prototype.listAssigned = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'tickets', 'assigned'], cb);//all?
};

Tickets.prototype.listByOrganization = function (orgID, cb) {
  return this.requestAll('GET', ['organizations', orgID, 'tickets'], cb);//all
};

Tickets.prototype.listByUserRequested = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'tickets', 'requested'], cb);//all
};

Tickets.prototype.listByUserCCD = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'tickets', 'ccd'], cb);//all
};

Tickets.prototype.listWithFilter = function (type, value, cb) {
  return this.requestAll('GET', ['tickets', { [type]: value }], cb);
};

Tickets.prototype.listRecent = function (cb) {
  return this.requestAll('GET', ['tickets', 'recent'], cb);//all?
};

Tickets.prototype.listCollaborators = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'collaborators'], cb);//all?
};

Tickets.prototype.listIncidents = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'incidents'], cb);//all
};

Tickets.prototype.listMetrics = function (ticketID, cb) {
  return this.request('GET', ['tickets', ticketID, 'metrics'], cb); //all
};

// ====================================== Viewing Tickets
Tickets.prototype.show = function (ticketID, cb) {
  return this.request('GET', ['tickets', ticketID], cb);
};

Tickets.prototype.showMany = function (ticket_ids, cb) {
  return this.request('GET', ['tickets', 'show_many', '?ids=' + ticket_ids.toString()], cb);
};

// ====================================== Creating Tickets
Tickets.prototype.create = function (ticket, cb) {
  return this.request('POST', ['tickets'], ticket, cb);
};

Tickets.prototype.createMany = function (tickets, cb) {
  return this.request('POST', ['tickets', 'create_many'], tickets, cb);
};

// ====================================== Updating Tickets
Tickets.prototype.update = function (ticketID, ticket, cb) {
  return this.request('PUT', ['tickets', ticketID], ticket, cb);
};

Tickets.prototype.updateMany = function (ticket_ids, ticket, cb) {
  return this.request('PUT', ['tickets', 'update_many', '?ids=' + ticket_ids.toString()], ticket, cb);
};

// ====================================== Deleting Tickets
Tickets.prototype.delete = function (ticketID, cb) {
  return this.request('DELETE', ['tickets', ticketID], cb);
};

Tickets.prototype.deleteMany = function (ticket_ids, cb) {
  return this.request('DELETE', ['tickets', 'destroy_many', '?ids=' + ticket_ids.toString()], cb);
};

// ====================================== Merging tickets
Tickets.prototype.merge = function (ticketID, mergedTicket, cb) {
  return this.request('POST', ['tickets', ticketID, 'merge'], mergedTicket, cb);
};

// ######################################################## Ticket export (max 1000 tickets per request in 5 min intrvals)
// ====================================== Ticket Export
Tickets.prototype.export = function (startTime, cb) {
  return this.request('GET', ['exports', 'tickets', { start_time: startTime }], cb);
};

// ====================================== Ticket Export Sample (max 50 tickets per request)
Tickets.prototype.exportSample = function (startTime, cb) {
  return this.request('GET', ['exports', 'tickets', 'sample', { start_time: startTime }], cb);
};

//  ====================================== New Incremental Ticket Export
Tickets.prototype.incremental = function (startTime, cb) {
  return this.requestAll('GET', ['incremental', 'tickets', { start_time: startTime }], cb);
};

//  ====================================== New Incremental Ticket Export with include
Tickets.prototype.incrementalInclude = function (startTime, include, cb) {
  return this.requestAll('GET', ['incremental', 'tickets', { start_time: startTime, include: include }], cb);
};

//  ====================================== New Incremental Ticket Export Sample
Tickets.prototype.incrementalSample = function (startTime, cb) {
  return this.request('GET', ['incremental', 'tickets', 'sample', { start_time: startTime }], cb);
};

// ====================================== Listing Ticket Comments
Tickets.prototype.getComments = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'comments'], cb);
};

// ######################################################## Ticket Audits

// ====================================== Listing Audits
Tickets.prototype.exportAudit = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'audits'], cb);
};

// ######################################################## Ticket Tags

// ====================================== Add Tags to Ticket
Tickets.prototype.addTags = function (ticketID, tags, cb) {
  return this.requestAll('PUT', ['tickets', ticketID, 'tags'], tags, cb);
};

// ====================================== Replace Tags to Ticket
Tickets.prototype.updateTags = function (ticketID, tags, cb) {
  return this.requestAll('POST', ['tickets', ticketID, 'tags'], tags, cb);
};

// ######################################################## Spam
Tickets.prototype.markAsSpam = function (ticketID, cb) {
    return this.request('PUT', ['tickets', ticketID, 'mark_as_spam'], cb);
}
