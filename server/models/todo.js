module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Todo;
};
