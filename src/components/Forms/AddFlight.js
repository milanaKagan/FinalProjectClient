import React from 'react'
import './FormsStyle.css';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'

const AddFlight = () => {
  return (
    <form className="form">
       <h2>Create New Flight</h2>
       <label for="airline">Choose Airline</label>       
       <select name="airline" id="airline">
          <option value="AirlineName">AirlineName</option>
       </select>   
       <label for="origin-country">Choose Origin Country</label>       
       <select name="origin-country" id="origin-country">
          <option value="Israel">Israel</option>
       </select>  
       <label for="destination-country">Choose Destination Country</label>       
       <select name="destination-country" id="destination-country">
          <option value="Israel">Israel</option>
       </select>    
       <DateTimePickerComponent className="date-time-picker" placeholder="Departure Date and Time" width="300px"></DateTimePickerComponent>
       <DateTimePickerComponent className="date-time-picker" placeholder="Landing Date and Time" width="300px"></DateTimePickerComponent>
       <input type="text" id="tickets-number" name="tickets-number" placeholder="Tickets Number"/>
       <button type="submit">Submit</button>
    </form>
  );
}

export default AddFlight;

