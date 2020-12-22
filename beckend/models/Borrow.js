module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Borrow",
    {
      borrow_date: {
        type: DataTypes.STRING(255)
      },
      borrow_status: {
        type: DataTypes.STRING(255)
      },
      return_date: {
        type: DataTypes.STRING(255)
      },
      num_date: {
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: "borrow"
    }
  );

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id' });
    model.belongsTo(models.Book, { foreignKey: 'book_id' });
  };
  return model;
}