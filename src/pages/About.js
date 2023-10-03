import React from "react";
import "../styles/About/About.css";
import { shannee } from "../assets";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2>About the Project</h2>
          <p>
            Welcome to the Inventory Management System (IMS) - a project
            developed and maintained by Shannee Ahirwar. IMS is a modern and
            efficient solution designed to help local store owners manage their
            inventory and sales effortlessly.
          </p>
          <p>
            This personal project reflects my passion for technology and my
            commitment to creating practical solutions for everyday challenges.
          </p>
          <p>
            If you have any inquiries or suggestions, please don't hesitate
            to contact me.
          </p>
          <div className="contact-details">
            <img
              src={shannee}
              alt="Your Name"
              className="profile-photo"
            />
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>
                <strong>Name:</strong> Shannee Ahirwar
              </p>
              <p style={{cursor: 'pointer'}}  onClick={()=>window.open("https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=shanneeahirwar@gmail.com", "_blank")}>
                <strong>Email:</strong> shanneeahirwar@gmail.com
              </p>
              <p style={{cursor: 'pointer'}} onClick={()=>window.open("https://www.linkedin.com/in/shannee-ahirwar-4516b1253/", "_blank")}>
                <strong>LinkedIn:</strong> shannee-ahirwar-4516b1253
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;


