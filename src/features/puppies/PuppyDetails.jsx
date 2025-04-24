

import { useDeletePuppyMutation, useGetPuppyQuery } from "./puppySlice";
import { useParams, useNavigate } from "react-router-dom";

// Fetch puppy data using the `getPuppy` query
export default function PuppyDetails() {
  const { id } = useParams(); 
  
  const navigate = useNavigate();  
  const {isSuccess, isLoading, isError, data: pupData } = useGetPuppyQuery(id);
  const [deletePup, { isLoading: isDeleting }] = useDeletePuppyMutation();
  const puppy = pupData?.data?.player;
  // Function to remove a puppy
  async function removePuppy(puppyId) {
    if (isDeleting) return; 
    try {
      await deletePup(puppyId).unwrap();
      alert("Puppy removed successfully!");
      navigate("/players");
    } catch (error) {
      alert("Failed to remove the puppy. Please try again.");
      console.error(error);
    }
  }

  
  if (isLoading) {
    return <p>Loading puppy information...</p>;
  }

  
  if (isError) {
    return <p>Failed to load puppy details. Please try again later.</p>;
  } 
  
  if (isSuccess && !puppy) {
    return <p>No puppy found with ID {id}.</p>;
  }

  if (isSuccess && puppy) {
  // Render puppy details
  return (
    <aside className="puppy-details-card">
      <h2>Selected Puppy: {puppy.name}</h2>

            {/* // Display puppy image// */}
      <img
             src={puppy.imageUrl}
             alt={puppy.name}
             style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '10px auto', borderRadius: '8px' }}
             onError={(e) => { e.target.style.display='none'; }}
          />
           {/* puppy info */}
          <p><strong>ID:</strong> {puppy.id}</p>
          <p><strong>Breed:</strong> {puppy.breed}</p>
          <p><strong>Team:</strong> {puppy.team?.name ?? "Unassigned"}</p>
          <p><strong>Status:</strong> {puppy.status ?? "Unknown"}</p>
          

          {/* delete button */}
          <button
          className="btn btn-danger" 
          onClick={() => removePuppy(puppy.id)}
          disabled={isDeleting} // Disable button during deletion
          type="button"
        >
          {isDeleting ? "Removing..." : "Remove from roster"}
        </button>

     
        
        {/* Back to roster button */}
      <button
          className="btn btn-secondary me-2" 
          onClick={() => navigate("/")} 
          type="button"
        >
          Back to roster
        </button>
    </aside>
  );
}
}