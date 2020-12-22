module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(255),
        unique: true
      },
      password: {
        type: DataTypes.STRING(255)
      },
      firstName: {
        type: DataTypes.STRING(255)
      },
      lastName: {
        type: DataTypes.STRING(255)
      },
      email: {
        type: DataTypes.STRING(255)
      },
      phone_Number: {
        type: DataTypes.STRING(255)
      },
      statue: {
        type: DataTypes.STRING(255)
      },
      numberId: {
        type: DataTypes.STRING(255)
      },
    },
    {
      tableName: "users",
    }
  );


  model.associate = models => {
    model.hasOne(models.Cart, { foreignKey: 'user_id' });
    model.hasMany(models.Borrow, { foreignKey: 'user_id' });
  };
  return model;
}