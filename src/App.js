import React from "react";

import Search from "./Search";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const imageURL = "https://wallup.net/wp-content/uploads/2018/09/26/65994-abstract-artwork.jpg";
  const divStyle = {
    backgroundImage: 'url('  + ')',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  };
  
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Search />
    </div>
  );
}