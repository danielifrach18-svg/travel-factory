import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAnimalsStore } from "../../store/useAnimalsStore";
import { useNavigate } from "react-router-dom";
import "./MainStyle.css";

type FormData = { name: string; species: string; birth_date: string };

export const Main = () => {
  const { animals, fetchAnimals, addAnimal } = useAnimalsStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const onSubmit = async (data: FormData) => {
    await addAnimal(data);
    reset();
  };

  return (
    <div className="animals-container">
      <h1 className="animals-title">Animals</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="animals-form">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("species", { required: "Species is required" })}
            placeholder="Species"
          />
          {errors.species && (
            <p className="error-msg">{errors.species.message}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            {...register("birth_date", { required: "Birth date is required" })}
          />
          {errors.birth_date && (
            <p className="error-msg">{errors.birth_date.message}</p>
          )}
        </div>

        <button type="submit">Add</button>
      </form>

      <div className="animals-list">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="animal-card"
            onClick={() => navigate(`/animals/${animal.id}`)}
          >
            <div className="animal-name">Name: {animal.name}</div>
            <div className="animal-species">Species: {animal.species}</div>
            <div className="animal-age">Age: {animal.age} years</div>
          </div>
        ))}
      </div>
    </div>
  );
};
