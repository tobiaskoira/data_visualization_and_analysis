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
  const handleCheckboxChange = (event, filterType) => {
    const { value, checked } = event.target;
    const updateFilter = (prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value);

    if (filterType === 'nature') setSelectedNatures(updateFilter);
    if (filterType === 'year') setSelectedYears(updateFilter);
  };

  const handleSliderChange = (event, newValue) => setMontantRange(newValue);
  const handleMarcheChange = (event, newValue) => setMarcheRange(newValue);
const buttonFilter = {
  whiteSpace: 'normal',
  textAlign: 'center',

 // overflow: 'hidden',
 // textOverflow: 'ellipsis',
 // fontSize: '0.875rem',
 // padding: '8px 12px',
};
  return (
    <Box>
      <Box mb={3} display="flex" justifyContent="flex-end"  >
        <Button variant="outlined" color="secondary" onClick={clearFilters} sx={buttonFilter}>
          Clear Filters
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={1} justifyContent="space-between" marginBottom={3} >
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(0)} sx={buttonFilter} >
            Filter by Nature du Marché
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(1)} sx={buttonFilter}>
            Filter by Year
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(2)} sx={buttonFilter}>
            Filter by Numéro Marché
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(3)} sx={buttonFilter}>
            Filter by Fournisseur Nom
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(4)} sx={buttonFilter}>
            Set Min/Max Montant
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(5)} sx={buttonFilter}>
            Filter by Date de début / de fin
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(6)} sx={buttonFilter}>
            Filter by Catégorie d'achat clé
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(7)} sx={buttonFilter}>
            Filter by Catégorie d'achat texte
          </Button>
        </Box>
        <Box width="200px">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(8)} sx={buttonFilter}>
            Set Durée de Marché
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

      {openCheckboxGroups[6] && (
        <Box mb={3}>
          <TextField
            label="Search by Catégorie d'achat clé"
            variant="outlined"
            fullWidth
            value={categorie_d_achat_cle}
            onChange={(e) => setCategorie_d_achat_cle(e.target.value)}
          />
        </Box>
      )}

      {openCheckboxGroups[7] && (
        <Box mb={3}>
          <TextField
            label="Search by Catégorie d'achat texte"
            variant="outlined"
            fullWidth
            value={categorie_d_achat_texte}
            onChange={(e) => setCategorie_d_achat_texte(e.target.value)}
          />
        </Box>
      )}

      {openCheckboxGroups[8] && (
        <Box mb={3}>
          <Typography gutterBottom>Durée du marché</Typography>
          <Slider value={marcheRange} onChange={handleMarcheChange} valueLabelDisplay="auto" min={0} max={10000} />
        </Box>
      )}
    </Box>
  );
}

export default Filters;
