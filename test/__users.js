const expect = require('chai').expect;
const user = require('../src/models/user');
const util = require('../lib/util');

let testUser = {};

describe('User Model', () => {
  // Before every test
  beforeEach(() => {
    const mockUser = {
      name: 'Cpt. Hydra',
      age: 13,
      hobby: 'Hailing',
    };

    user.create(mockUser, (error) => {
      util.debug('Error creating mock user.', error);
    }, (newDbUser) => {
      testUser = newDbUser;
    });
  });

  // // afterEach
  //
  // it('Should be able to Read All Users', (done) => {
  //   user.findAll((error) => {
  //     util.debug('Error reading all Users', error);
  //   }, (allUsers) => {
  //     expect(allUsers.length).to.be.above(10000000000);
  //     done();
  //   });
  // });
  //
  // it('Should be able to Read One User', (done) => {
  //   user.find(testUser, (error) => util.debug('Error reading One User', error),
  //   (oneUser) => {
  //     expect(oneUser.id).to.be.equal(testUser.id);
  //     done();
  //   });
  // });

  it('Should be able to Create', () => {
    expect(testUser.id).to.not.be.null;
  });

  it('Should be able to Update', (done) => {
    const updateInfo = {
      id: testUser.id,
      name: 'Kevin',
    };
    user.update(updateInfo, (err) => util.debug('User failed to update', err),
    (updatedDbUser) => {
      expect(updatedDbUser.name).to.be.equal(updateInfo.name);
      testUser = updatedDbUser;
      done();
    });
  });
  it('Should be able to Delete', (done) => {
    user.destroy(testUser, (err) => util.debug('User Errored while destroying', err),
    (responseFromDestroy) => {
      expect(responseFromDestroy).to.be.equal(1);
      done();
    });
  });
});
