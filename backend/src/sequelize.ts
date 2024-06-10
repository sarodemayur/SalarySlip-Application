// sequelize.ts

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('demo', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
