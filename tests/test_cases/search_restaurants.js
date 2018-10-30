'use strict';

const co       = require('co');
const expect   = require('chai').expect;
const init     = require('../steps/init').init;
const tearDown = require('../steps/tearDown');
const given    = require('../steps/given');
const when     = require('../steps/when');

describe(`Given an authorized user`, co.wrap(function* () {
  let user;
  before(co.wrap(function* () {
    yield init();
    user = yield given.an_authenticated_user();
    console.log('beforeall' + '-----' + user);
  }));

  after(co.wrap(function* () {
    yield tearDown.an_authenticated_user(user);
  }));

  describe(`When we invoke the POST /restaurants/search endpoint with theme 'cartoon'`, co.wrap(function* () {  
    it(`Should return an array of 4 restaurants`, co.wrap(function* () {
      let res = yield when.we_invoke_search_restaurants(user, 'cartoon');
  
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.lengthOf(4);
  
      for (let restaurant of res.body) {
        expect(restaurant).to.have.property('name');
        expect(restaurant).to.have.property('image');
      }
    }));
  }));
}));