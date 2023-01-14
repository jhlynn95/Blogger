const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
var moment = require('moment');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
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
        modelName: 'comments'
    }
);

module.exports = Comment;
