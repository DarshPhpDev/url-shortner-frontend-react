/* eslint-disable react/style-prop-object */
import './App.css';

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const rows = [];
  const [data, setData] = useState([]);
  const [fullUrl, setFullUrl] = useState('');

  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/urls`).then((res) => {
      setData(res.data.data);
    });
  };

  const createRow = async (row) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/urls`, {
      fullUrl
    })
      .then((res) => {
        getData();
        setFullUrl('');
      });
  };

  const removeRow = async (row) => {
    if (await confirm('Are you sure to remove ?')) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/urls/delete/${row.shortUrl}`)
        .then((res) => {
          getData();
        });
    }
  };

  const goToUrl = async (row) => {
    await window.open(`${process.env.REACT_APP_API_URL}/short-url/${row.shortUrl}`, '_blank');
    getData();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <Container maxWidth="md">
        <h1>Url Shortner</h1>
        <TextField
          required
          id="url"
          label="Url"
          variant="standard"
          fullWidth
          margin="normal"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <Button fullWidth variant="contained" color="success" onClick={() => createRow()}>Shorten Url</Button>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">FullUrl</TableCell>
                <TableCell align="center">ShortUrl</TableCell>
                <TableCell align="center">Clicks</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <a target="_blank" href={row.fullUrl} rel="noreferrer">{row.fullUrl}</a>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <a target="_blank" href="#" onClick={() => goToUrl(row)} rel="noreferrer">{row.shortUrl}</a>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.clicks}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Button fullWidth size="small" variant="contained" color="error" onClick={() => removeRow(row)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
