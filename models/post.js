const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
var moment = require('moment');

class post extends Model {}

post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            get: function() {
                return moment.utc(this.getDataValue('createdAt')).format('MM/DD/YYYY');
            },
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
            get: function() {
                return moment.utc(this.getDataValue('updatedAt')).format('MM/DD/YYYY');
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = post;
