module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Admin",
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
      }
    },
    {
      tableName: "admin"
    }
  );

  model.associate = models => {
    model.hasMany(models.Book, { foreignKey: "admin_id" });
  };
  return model;
}