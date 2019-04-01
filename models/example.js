module.exports = function(sequelize, DataTypes) {
    return User = sequelize.define("Example", {
        name: DataTypes.STRING,
        email: DataTypes.TEXT,
        weatherPos: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        newsPos: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        stocksPos: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        calendarPos: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        tasksPos: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    });
};
