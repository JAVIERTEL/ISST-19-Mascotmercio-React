import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom

function AboutUs() {
  return (
    <div id="aboutus">
      <br />
      <p className="centered-text mt-3 fw-bold">
        <span className="bold-font">
          <h1> About Mascotmercio </h1>
        </span>
      </p>
      <div className="container">
        <div className="p-4 mb-4 bg-light rounded">
          <p>
            Mascotmercio is an application dedicated to providing information about establishments that offer services for pets. Whether you need a place for grooming, pet supplies, pet-friendly restaurants, or any other service related to pets, Mascotmercio aims to be your go-to platform.
          </p>
        </div>
        <div className="p-4 mb-4 bg-light rounded">
          <p>
            Our mission is to simplify the process of finding and accessing pet services by providing a centralized platform where users can easily search for and discover various pet-related businesses in their area.
          </p>
        </div>
        <div className="p-4 mb-4 bg-light rounded">
          <p>
            With Mascotmercio, pet owners can:
            <ul>
              <li>Discover a wide range of pet services offered by local businesses.</li>
              <li>Read reviews and ratings from other pet owners to make informed decisions.</li>
              <li>Find pet-friendly establishments for outings with their furry friends.</li>
              <li>Conveniently book appointments or make reservations directly through the platform.</li>
            </ul>
          </p>
        </div>
        <div className="p-4 mb-4 bg-light rounded">
          <p>
            Whether you're a dog lover, a cat person, or the proud owner of any other furry, feathered, or scaly friend, Mascotmercio strives to make your pet care experience easier and more enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
