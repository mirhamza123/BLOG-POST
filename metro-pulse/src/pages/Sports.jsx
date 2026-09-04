import React from "react";
import SportsComponent from "../components/sport/Sports";

function SportsPage({ searchQuery }) {
  return <SportsComponent searchQuery={searchQuery} />;
}

export default SportsPage;
