module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Book",
    {
      name: {
        type: DataTypes.STRING(255),
      },
      statusBook: {
        type: DataTypes.STRING(255),
      },
      main_image: {
        type: DataTypes.STRING(255),
      },
      author: {
        type: DataTypes.STRING(255)
      },
      price: {
        type: DataTypes.STRING(255)
      },
      description: {
        type: DataTypes.STRING(1000)
      },
      publicId: {
        type: DataTypes.STRING(255)
      },
      nameType: {
        type: DataTypes.STRING(255)
      },
      codeType: {
        type: DataTypes.STRING(255)
      },
      countInStock: {
        type: DataTypes.INTEGER,
      },

    },
    {
      tableName: "book"
    }
  );
  model.associate = models => {
    model.belongsTo(models.Admin, { foreignKey: 'admin_id' });
    model.hasMany(models.Cart, { foreignKey: 'book_id' });
    model.hasMany(models.Borrow, { foreignKey: 'book_id' });
  };
  return model;
}