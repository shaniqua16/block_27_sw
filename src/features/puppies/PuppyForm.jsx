import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";
import { useNavigate } from "react-router-dom";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const navigate = useNavigate();
  const [addPup, { isLoading }] = useAddPuppyMutation();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
  });
  const [error, setError] = useState("");

  // Update form data when input fields change
  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit the form and add a new puppy
  async function postPuppy(event) {
    event.preventDefault();

    // Add a placeholder image to the form data
    const puppyData = {
      ...formData,
      imageUrl: "https://loremflickr.com/200/300/dog",
    };

    try {
      const response = await addPup(puppyData).unwrap();
      if (response) {
        setError(""); // Clear any previous error
        navigate("/puppies"); // Navigate to the correct page after successful submission
      }
    } catch (error) {
      setError("Failed to add puppy. Please try again.");
      console.error("Failed to add puppy:", error);
    }
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="name" // Matches the key in formData
            value={formData.name}
            onChange={update}
            required
          />
        </label>
        <label>
          Breed
          <input
            name="breed" // Matches the key in formData
            value={formData.breed}
            onChange={update}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add to Roster"}
        </button>

        <button
          className="btn btn-secondary me-2" 
          onClick={() => navigate("/")} 
          type="button"
        >
          Back to roster
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}