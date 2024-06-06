import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './PeriodButton.module.css';

const PeriodButton = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setStartDate(null);
    }
  };

  const handleFilter = () => {
    // Aqui você pode implementar a lógica de filtro usando as datas selecionadas
    console.log("Data Inicial:", startDate ? startDate.toLocaleDateString() : null);
    console.log("Data Final:", endDate ? endDate.toLocaleDateString() : null);
  };

  return (
    <div className={styles.datepicker_wrapper}>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Data Inicial"
        dateFormat="dd/MM/yyyy"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Data Final"
        dateFormat="dd/MM/yyyy"
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default PeriodButton;
