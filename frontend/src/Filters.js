
import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Slider, Box, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Filters({ filterOptions, onFilterChange }) {
  const [selectedNature, setSelectedNature] = useState([]);
  const [montantRange, setMontantRange] = useState([0, 100000]);
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [dureeMarche, setDureeMarche] = useState("");
  const [anneeNotification, setAnneeNotification] = useState("");

  // Handle checkbox filter for Nature du Marché
  const handleNatureChange = (event) => {
    const { value, checked } = event.target;
    setSelectedNature((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Apply all filters
  const applyFilters = () => {
    onFilterChange({
      nature: selectedNature,
      montantRange,
      dateDebut,
      dateFin,
      dureeMarche,
      anneeNotification,
    });
  };

  return (
    <Box>
      <Typography variant="h6">Filters</Typography>

      {/* Nature du Marché Checkboxes */}
      <Typography variant="h6">Nature du Marché</Typography>
      <FormGroup row>
        {filterOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                value={option}
                onChange={handleNatureChange}
                checked={selectedNature.includes(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>

      {/* Montant Min and Max Slider */}
      <Typography gutterBottom>Montant Range (HT)</Typography>
      <Slider
        value={montantRange}
        onChange={(e, newValue) => setMontantRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100000} // Adjust max value based on your data
      />

      {/* Date Pickers for Date de Debut and Date de Fin */}
      <DatePicker
        label="Date de Debut"
        value={dateDebut}
        onChange={(newValue) => setDateDebut(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="Date de Fin"
        value={dateFin}
        onChange={(newValue) => setDateFin(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />

      {/* Duree du Marche */}
      <TextField
        label="Duree du Marche"
        type="number"
        value={dureeMarche}
        onChange={(e) => setDureeMarche(e.target.value)}
        fullWidth
      />

      {/* Année de Notification */}
      <TextField
        label="Année de Notification"
        type="number"
        value={anneeNotification}
        onChange={(e) => setAnneeNotification(e.target.value)}
        fullWidth
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
}

export default Filters;
