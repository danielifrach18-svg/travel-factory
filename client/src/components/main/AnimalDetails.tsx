import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as api from "../../api/animals";
import "./AnimalDetails.css";
import { Animal, Event } from "../../interfaces/Animal.Interface";

type EventForm = {
  type: Event["type"];
  description: string;
  event_date: string;
};

export const AnimalDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventForm>();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.getAnimalDetails(Number(id));
      setAnimal(res.data);
    })();
  }, [id]);

  const onSubmit = async (data: EventForm) => {
    await api.addEvent(Number(id), data);
    const res = await api.getAnimalDetails(Number(id));
    setAnimal(res.data);
    reset();
  };

  const exportExcel = async () => {
    const res = await api.exportAnimal(Number(id));
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `animal_${id}_events.xlsx`;
    a.click();
  };

  if (!animal) return <p>Loading...</p>;

  return (
    <div className="animal-container">
      <h2 className="animal-title">Name: {animal.name}</h2>
      <p className="animal-info">Species: {animal.species}</p>
      <p className="animal-info">
        Birth Date: {format(parseISO(animal.birth_date), "dd/MM/yyyy")}
      </p>
      <p className="animal-info">Age: {animal.age}</p>

      <h2 className="events-title">Events</h2>
      <ul className="events-list">
        {animal.events?.map((ev: Event) => (
          <li key={ev.id}>
            {ev.type} - {ev.description} (
            {format(parseISO(ev.event_date), "dd/MM/yyyy")})
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className="event-form">
        <select
          {...register("type", { required: "Please select an event type" })}
        >
          <option value="">Select type</option>
          <option>Visit</option>
          <option>Treatment</option>
          <option>Observation</option>
        </select>
        {errors.type && <p className="error-msg">{errors.type.message}</p>}

        <input
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="error-msg">{errors.description.message}</p>
        )}

        <input
          type="date"
          {...register("event_date", { required: "Please select a date" })}
        />
        {errors.event_date && (
          <p className="error-msg">{errors.event_date.message}</p>
        )}

        <button type="submit">Add Event</button>
      </form>

      <button onClick={exportExcel} className="export-button">
        Export to Excel
      </button>
    </div>
  );
};
