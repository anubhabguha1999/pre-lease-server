const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection"); // Your database connection

const SalesRelationship = sequelize.define(
  "SalesRelationship",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    salesExecutiveId: {
      type: DataTypes.UUID,
      allowNull: false,
      // Foreign key managed by association in index.jsE",
    },
    salesManagerId: {
      type: DataTypes.UUID,
      allowNull: false,
      // Foreign key managed by association in index.js
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      // Foreign key managed by association in index.js
    },
    unassignedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    unassignedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      // Foreign key managed by association in index.js
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "sales_relationship",
    // timestamps: true,    // ✅ Inherited from global config
    // underscored: true,   // ✅ Inherited from global config
    // freezeTableName: true, // ✅ Inherited from global config
  }
);

module.exports = SalesRelationship;
