module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        authId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        familyName: DataTypes.STRING,
        givenName: DataTypes.STRING,
        gender: DataTypes.STRING,
        locale: DataTypes.STRING,
        picture: DataTypes.STRING,
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
    User.associate = function(models) {
        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };
    return User;
};
