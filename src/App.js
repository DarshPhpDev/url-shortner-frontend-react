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
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/urls`).then((res) => {
      setData(res.data.data);
    });
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
        />
        <Button fullWidth variant="contained" color="success">Shorten Url</Button>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">FullUrl</TableCell>
                <TableCell align="center">ShortUrl</TableCell>
                <TableCell align="center">Clicks</TableCell>
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
                    <a target="_blank" href={row.shortUrl} rel="noreferrer">{row.shortUrl}</a>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.clicks}
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
