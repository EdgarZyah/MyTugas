// Tambahkan field deadline
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: {
      type: DataTypes.DATE, // field baru
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
  };

  return Todo;
};
