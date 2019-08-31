const faker = require('faker');

const createUser = (id) => ({
  // id: faker.random.uuid(),
  id,
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.internet.avatar(),
  title: faker.name.jobTitle(),
  company: faker.company.companyName()
});

module.exports = {
  createUser
};
