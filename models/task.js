module.exports = function(sequelize, DataTypes) {
    const Task = sequelize.define("Task", {
        text: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN
    });
    Task.associate = function (models) {
        Task.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Task;
};
