import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { writeSpot } from "../../store/spots";
import "./createSpot.css";
import { useHistory } from "react-router-dom";
import { add } from "mathjs";

export default function CreateSpot() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {}, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    let formErrors = {};

    if (!address) {
      formErrors = { ...formErrors, address: "Streed address is required" };
    }
    if (!country) {
      formErrors = { ...formErrors, country: "Country is required" };
    }
    if (!city) {
      formErrors = { ...formErrors, city: "City is required" };
    }
    if (!state) {
      formErrors = { ...formErrors, state: "State is required" };
    }
    if (!lat) {
      formErrors = { ...formErrors, lat: "Latitude is required" };
    }
    if (!lng) {
      formErrors = { ...formErrors, lng: "Longitude is required" };
    }
    if (!description) {
      formErrors = { ...formErrors, description: "Description is required" };
    }
    if (!name) {
      formErrors = { ...formErrors, name: "Name is required" };
    }
    if (!price) {
      formErrors = { ...formErrors, price: "Price is required" };
    }

    const isImage = (previewImage) => {
      return (
        previewImage &&
        (previewImage.endsWith(".jpeg") ||
          previewImage.endsWith(".jpg") ||
          previewImage.endsWith(".gif") ||
          previewImage.endsWith(".png"))
      );
    };
    if (!previewImage || !isImage(previewImage)) {
      formErrors = {
        ...formErrors,
        previewImage:
          "Preview Image is required and must an image file (.jpeg, jpg, .gif, .png)",
      };
    }

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage: {
        url: previewImage,
        preview: true,
      },
    };

    setErrors(formErrors);
    console.log('pre error test')
    console.log(errors)
    if (Object.keys(errors).length) {
      console.log('passed error check')
      const response = await dispatch(writeSpot(newSpot))
        .then(async (res) => {
          if (res && res.id) {
            console.log('passed backend')
            history.push(`/spots/${res.id}`);
            reset();
          }
        })
        .catch((errors) => {
          console.log('errors passed from backend')
          if (errors) {
            // setErrors(errors);
          }
        });
      }
    };

  const reset = () => {
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
  };

  return (
    <div className="create-form-inputBox">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h1>Create a new Spot</h1>
        <div className="create-form-place-located-question">
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <div className="create-form-spot-address">
          <label></label>
          <label></label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            placeholder="Country"
            className="create-form-country-address"
          ></input>
          <div className="create-form-errors">{errors.country}</div>
          <label></label>
          <label></label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            name="address"
            className="create-form-country-address"
          />
          <div className="create-form-errors">{errors.address}</div>
          <div className="city-state-create-form">
            <label></label>
            <label></label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="City"
              name="city"
              className="create-form-cit-state-lat-lng"
            />
            ,<label></label>
            <label></label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              name="state"
              placeholder="State"
              className="create-form-cit-state-lat-lng"
            ></input>
          </div>
          <div className="create-form-errors">{errors.city}</div>
          <div className="create-form-errors">{errors.state}</div>
          <div className="lat-long-create-form">
            <label></label>
            <label></label>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              name="lat"
              placeholder="Latitude"
              className="create-form-cit-state-lat-lng"
            ></input>
            ,<label></label>
            <label></label>
            <input
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              name="lng"
              placeholder="Longitude"
              className="create-form-cit-state-lat-lng"
            ></input>
          </div>
          <div className="create-form-errors">{errors.lat}</div>
          <div className="create-form-errors">{errors.lng}</div>
        </div>
        <div className="create-form-description-textarea">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neightboorhood.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Please write at least 30 characters"
          ></textarea>
          <label className="create-form-errors">{errors.description}</label>
        </div>
        <div className="create-form-spot-name">
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            className="create-spot-name-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Name of your spot"
          ></input>
          <label className="create-form-errors">{errors.name}</label>
        </div>
        <div className="create-form-spot-price">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <label>$</label>
          <input
            className="create-spot-price-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            placeholder="Price per night (USD)"
          ></input>
          <label className="create-form-errors">{errors.price}</label>
        </div>
        <div className="create-form-spot-images">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            name="previewImage"
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
          ></input>
          <label className="create-form-errors">{errors.previewImage}</label>
          <input name="image1" placeholder="Image URL"></input>
          <input name="image2" placeholder="Image URL"></input>
          <input name="image3" placeholder="Image URL"></input>
          <input name="image4" placeholder="Image URL"></input>
        </div>
        <div className="button-div">
          <button className="create-form-submit-button" type="submit">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}
