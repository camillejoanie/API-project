// frontend/src/components/CreateSpotForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";
import "./CreateNewSpot.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "80.5495",   
    lng: "-100.5899", 
    description: "",
    name: "",
    price: "",
    previewImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(createSpot(formData));
    if (success) {
      history.push(`/spots/${success.id}`);
    }
  };

  return (
    <div className="create-spot-form-container">
      <form onSubmit={handleSubmit}>
      <h1 className="form-title">Create a New Spot</h1>
        {/* Location */}
        <section className="form-section">
          <h2 className="section-heading">Where's your place located?</h2>
          <p className="section-caption">
            Guests will only get your exact address once they book a reservation.
          </p>
          <label>Country</label>
          <input
            className="create-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <label>Street Address</label>
          <input
            className="create-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <label>City</label>
          <input
            className="create-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <label>State</label>
          <input
            className="create-input"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <label>Latitude</label>
          <input
            className="create-input"
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
          />
          <label>Longitude</label>
          <input
            className="create-input"
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
          />
           {/* Description */}
          <h2 className="section-heading">Describe your place to guests</h2>
          <p className="section-caption">
            Mention the best features of your space, any special amenities like fast WiFi or parking, and what you love about the neighborhood.
          </p>
          <label>Description</label>
          <textarea
            className="create-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
          />
        </section>

        {/* Title */}
        <section className="form-section">
          <h2 className="section-heading">Create a title for your spot</h2>
          <p className="section-caption">
            Catch guests' attention with a spot title that highlights what makes your place special.
          </p>
          <label>Title</label>
          <input
            className="create-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name of your spot"
          />
        </section>

        {/* Price */}
        <section className="form-section">
          <h2 className="section-heading">Set a base price for your spot</h2>
          <p className="section-caption">
            Competitive pricing can help your listing stand out and rank higher in search results.
          </p>
          <label>Price per night (USD)</label>
          <input
            className="create-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per night (USD)"
          />
        </section>

        {/* Images */}
        <section className="form-section">
          <h2 className="section-heading">Liven up your spot with photos</h2>
          <p className="section-caption">
            Submit a link to at least one photo to publish your spot.
          </p>
          <label>Preview Image URL (required)</label>
          <input
            className="create-input"
            type="text"
            name="previewImage"
            value={formData.previewImage}
            onChange={handleChange}
            placeholder="Preview Image URL"
            required
          />
          <label>Image URL 1</label>
          <input
            className="create-input"
            type="text"
            name="image1"
            value={formData.image1}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <label>Image URL 2</label>
          <input
            className="create-input"
            type="text"
            name="image2"
            value={formData.image2}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <label>Image URL 3</label>
          <input
            className="create-input"
            type="text"
            name="image3"
            value={formData.image3}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <label>Image URL 4</label>
          <input
            className="create-input"
            type="text"
            name="image4"
            value={formData.image4}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </section>

        {/* Submit Button */}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpotForm;
