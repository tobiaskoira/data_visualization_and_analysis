// Filters.js
import React from 'react';
import { Box, Typography, TextField, Slider, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

function Filters({
  natureOptions,
  yearOptions,
  selectedNatures,
  selectedYears,
  setSelectedNatures,
  setSelectedYears,
  numeroMarche,
  setNumeroMarche,
  fournisseurNom,
  setfournisseurNom,
  montantRange,
  setMontantRange,
  marcheRange,
  setMarcheRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categorie_d_achat_cle,
  setCategorie_d_achat_cle,
  categorie_d_achat_texte,
  setCategorie_d_achat_texte,
  openCheckboxGroups,
  toggleCheckboxGroup,
  clearFilters,
}) {
  // Handlers
  const handleCheckboxChange = (event, filterType) => {
    const { value, checked } = event.target;
    const updateFilter = (prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value);

    if (filterType === 'nature') setSelectedNatures(updateFilter);
    if (filterType === 'year') setSelectedYears(updateFilter);
  };

  const handleSliderChange = (event, newValue) => setMontantRange(newValue);
  const handleMarcheChange = (event, newValue) => setMarcheRange(newValue);

  return (
    <Box>
      {/* Clear Filters Button */}
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Filter Buttons */}
      <Box display="flex" flexWrap="wrap" gap={1} marginBottom={3}>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(1)}>
            Filter by Year
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(2)}>
            Filter by Numéro Marché
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(3)}>
            Filter by Fournisseur Nom
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(0)}>
            Filter by Nature du Marché
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(4)}>
            Set Min/Max Montant
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(5)}>
            Filter by Date de début / de fin
          </Button>
        </Box>
      </Box>

      {/* Individual Filters */}
      {openCheckboxGroups[0] && (
        <Box mb={3}>
          <Typography variant="h6">Nature du Marché Options</Typography>
          <FormGroup>
            {natureOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={<Checkbox value={option} checked={selectedNatures.includes(option)} onChange={(e) => handleCheckboxChange(e, 'nature')} />}
                label={option}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      {openCheckboxGroups[1] && (
        <Box mb={3}>
          <Typography variant="h6">Année de Notification Options</Typography>
          <FormGroup row>
            {yearOptions.map((year) => (
              <FormControlLabel
                key={year}
                control={<Checkbox value={year} checked={selectedYears.includes(year)} onChange={(e) => handleCheckboxChange(e, 'year')} />}
                label={year}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      {openCheckboxGroups[2] && (
        <Box mb={3}>
          <TextField label="Search by Numéro Marché" variant="outlined" fullWidth value={numeroMarche} onChange={(e) => setNumeroMarche(e.target.value)} />
        </Box>
      )}

      {openCheckboxGroups[3] && (
        <Box mb={3}>
          <TextField label="Search by Fournisseur Nom" variant="outlined" fullWidth value={fournisseurNom} onChange={(e) => setfournisseurNom(e.target.value)} />
        </Box>
      )}

      {openCheckboxGroups[4] && (
        <Box mb={3}>
          <Typography gutterBottom>Montant Range (HT)</Typography>
          <Slider value={montantRange} onChange={handleSliderChange} valueLabelDisplay="auto" min={0} max={1000000} />
        </Box>
      )}

      {openCheckboxGroups[5] && (
        <Box mb={3} display="flex" gap={2}>
          <TextField
            label="Date de début"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
          />
          <TextField
            label="Date de fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
}

export default Filters;

