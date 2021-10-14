import React from 'react'
import './FormsStyle.css';

const AddAirline = () => {
  return (
    <form className="form">
       <h2>Create New Airline</h2>
       <input type="text" id="name-airline" placeholder="Airline Name"/>
       <select name="country" id="country">
          <option value="Israel">Israel</option>
       </select>   
       <button type="submit">Submit</button>
    </form>
  );
}

export default AddAirline;

