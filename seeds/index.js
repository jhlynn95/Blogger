const sequelize = require('../config/connection');
const seedpost = require('./postData');
const seedComment = require('./commentData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedpost();

    await seedComment();

    process.exit(0);
};

seedAll();
