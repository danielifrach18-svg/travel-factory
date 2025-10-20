import { DataTypes } from "sequelize";
import db from "../config/db.config";

export const Event = db.sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "animals",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("Visit", "Treatment", "Observation"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);
