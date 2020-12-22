
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Cart",
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cart",
    }
  );
  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: "user_id" });
    model.belongsTo(models.Book, { foreignKey: "book_id" });
  };
  return model;
};


