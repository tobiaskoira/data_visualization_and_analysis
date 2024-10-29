import React, {useState, useEffect} from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch data from PHP API
  useEffect(() => {
    fetch('http://localhost/paris_data_app/api/display_data_paris.php')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  // Render loading spinner if data is not yet loaded
  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ marginTop: '50px' }} />
      </Container>
    );
  }
  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Année de Notification</TableCell>
              <TableCell>Numéro Marché</TableCell>
              <TableCell>Objet du Marché</TableCell>
              <TableCell>Nature du Marché</TableCell>
              <TableCell>Fournisseur Nom</TableCell>
              <TableCell>Montant Min (HT)</TableCell>
              <TableCell>Montant Max (HT)</TableCell>
              <TableCell>Date de Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.annee_de_notification}</TableCell>
                <TableCell>{item.numero_marche}</TableCell>
                <TableCell>{item.objet_du_marche}</TableCell>
                <TableCell>{item.nature_du_marche}</TableCell>
                <TableCell>{item.fournisseur_nom}</TableCell>
                <TableCell>{item.montant_min_ht}</TableCell>
                <TableCell>{item.montant_max_ht}</TableCell>
                <TableCell>{item.date_de_notification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
