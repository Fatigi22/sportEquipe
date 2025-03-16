import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onSelectDate }) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
        onSelectDate(date);
    };

    // Function to customize the day class
    const dayClassName = (date) => {
        const day = date.getDate();
        if (day === 15) {
            return "highlighted-day"; // Example: Custom class for day 15
        }
        return ""; // No custom class for other days
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                inline
                dateFormat="yyyy/MM/dd"
                dayClassName={dayClassName} // Correctly passing the function here
            />
        </div>
    );
};

export default Calendar;
