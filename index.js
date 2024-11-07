const express = require('express');
const app = express();
const port = 1500;

const data = [
    {   circuit: 'Losail',
    location: 'Qatar',
    winner: {
        firstName:'Andrea',
        lastName : 'Dovioso',
        country : 'italy'
    }
},
{   circuit: 'Autodromo',
    location: 'Argentina',
    winner: {
        firstName:'Cal',
        lastName : 'Crutclow',
        country : 'UK'
    }
},
{   circuit: 'De Jerez',
    location: 'Spain',
    winner: {
        firstName:'Valentino',
        lastName : 'Rossi',
        country : 'italy'
    }
},
{   circuit: 'Mugello',
    location: 'Italy',
    winner: {
        firstName:'Andrea',
        lastName : 'Dovioso',
        country : 'italy'
    }
},
  ];

// Fungsi untuk mengelompokkan data berdasarkan properti
function groupBy(arr, country) {
    return arr.reduce((acc, obj) => {
      const key = obj.winner[country]; // Mengakses properti dalam nested object
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  }
  
 
  // Rute untuk menampilkan semua data
  app.get('/', (req, res) => {
    res.json(data);
  });
  
  // Rute untuk menampilkan data berdasarkan negara
  app.get('/country', (req, res) => {
    const groupedByCountry = groupBy(data, 'country');
    res.json(groupedByCountry);
  });
  
  // Rute untuk menampilkan data berdasarkan nama pemenang
  app.get('/name', (req, res) => {
    const groupedByName = groupBy(data, 'firstName'); // Mengelompokkan berdasarkan first name
    res.json(groupedByName);
  });
  
  // Rute untuk menangani permintaan yang tidak valid
  app.get('*', (req, res) => {
    res.status(400).send('Bad Request');
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});