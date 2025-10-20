import { differenceInYears } from "date-fns";
import { DataTypes } from "sequelize";
import db from "../config/db.config";
import { AnimalInstance } from "../animals/interfaces/Animal.Interface";

export const Animal = db.sequelize.define<AnimalInstance>(
  "Animal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "animals",
    timestamps: false,
  }
) as any;

Animal.prototype.getAge = function (this: AnimalInstance): number {
  const age = differenceInYears(new Date(), new Date(this.birth_date));
  return age;
};
