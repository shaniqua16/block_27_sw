/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
import { useGetPuppiesQuery } from "./puppySlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PuppyList({  }) {
  const {  isLoading, isError, data: pupInfo } = useGetPuppiesQuery();
  const puppies = pupInfo?.data?.players || [];
  const navigate = useNavigate();
  const [searched, setSearched] = useState("");

  const handleChange = (e) => { 
    setSearched(e.target.value);
  };

  const searchedPuppy = puppies.filter((puppy) =>
        puppy?.name?.toLowerCase().startsWith(searched.toLowerCase())
      );


  if (isLoading) {
    return <p>Loading puppies...</p>;
  }

  if (isError) {
    return <p>Failed to load puppies. Please try again later.</p>;
  }

  return (
    <>
      <div className="container mb-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-container position-relative">
              
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search Puppy Name..."
                value={searched}
                onChange={handleChange}
              />
              <button
          className="btn btn-secondary me-2 register-pup-btn" 
          onClick={() => navigate("/form")} 
          type="button"
        >
          Register Pup
        </button>
              <i className="fas fa-search search-icon" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }}></i>
            </div>
          </div>
        </div>
      </div>

      <article>
        <h2>Roster</h2>
      
        { searched && !searchedPuppy.length && (
          <p>No puppies match your search "{searched}".</p>
        )}
        
        <ul className="puppies list-unstyled">
          {searchedPuppy.map((p) => (
            p?.id ? (
              <li key={p.id} className="mb-3 border p-2 rounded">
                <h3>
                  {p.name} #{p.id}
                </h3>
                <figure>
                  <img src={p.imageUrl} alt={p.name} 
                  onError={(e) => { e.target.style.display='none';  }}
                  style={{ maxWidth: '100px', height: 'auto', display: 'block' }} 
                 />
                </figure>
                <Link to={`/players/${p.id}`}>
                  <button
                    className="btn btn-outline-success"
                    type="button"
                  >
                    See details
                  </button>
                </Link>

                
              </li>
            ) : null
          ))}
        </ul>
      </article>
    </>
  );
}
// -----------------------------------------------------------------------------------------------------------


