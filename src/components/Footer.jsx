import React from "react";
import { Image } from "react-bootstrap";
import logoFooter from "../assets/img/logoFooter.png";

export default function Footer() {
  return (
    <div className=" text-white footer">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <Image className="w-25" src={logoFooter} alt="logoFooter" fluid />
            <ul className="list-unstyled ">
              <li>Copyright ® Mago</li>
              <li>Tucumán - Argentina 2022</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
