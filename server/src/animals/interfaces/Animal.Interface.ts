import { Model, Optional } from "sequelize";

export interface AnimalAttributes {
  id: number;
  name: string;
  species: string;
  birth_date: string;
}

export interface AnimalInstance
  extends Model<AnimalAttributes, Optional<AnimalAttributes, "id">>,
    AnimalAttributes {
  getAge(): number;
}
