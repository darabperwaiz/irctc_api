const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

// Sample data (You can move this data to a separate JSON file)
const trainData = {
  "trains": [
    {
      "train_number": "12345",
      "train_name": "Rajdhani Express",
      "source": {
        "station_code": "NDLS",
        "station_name": "New Delhi"
      },
      "destination": {
        "station_code": "MUMBAI",
        "station_name": "Mumbai"
      },
      "train_type": "Express",
      "status": "Running"
    },
    {
      "train_number": "67890",
      "train_name": "Shatabdi Express",
      "source": {
        "station_code": "NDLS",
        "station_name": "New Delhi"
      },
      "destination": {
        "station_code": "KANPUR",
        "station_name": "Kanpur"
      },
      "train_type": "Express",
      "status": "Running"
    },
    {
      "train_number": "23456",
      "train_name": "Duronto Express",
      "source": {
        "station_code": "KOLKATA",
        "station_name": "Kolkata"
      },
      "destination": {
        "station_code": "MUMBAI",
        "station_name": "Mumbai"
      },
      "train_type": "Super Fast",
      "status": "Running"
    }
  ]
};

// Middleware for parsing JSON request bodies
app.use(cors())
app.use(bodyParser.json());

// Route to search trains based on source, destination, or status
app.post('/api/v1/trains/search', (req, res) => {
    console.log(req.body)
  const { source, destination } = req.body;
  
  // Filter trains based on query parameters
  let filteredTrains = trainData.trains;

  if (source) {
    filteredTrains = filteredTrains.filter(train => train.source.station_name.toLowerCase().includes(source.toLowerCase()));
  }

  if (destination) {
    filteredTrains = filteredTrains.filter(train => train.destination.station_name.toLowerCase().includes(destination.toLowerCase()));
  }

  // Return filtered trains
  res.json(filteredTrains);
});

app.get('/api/v1/trains', (req, res)=> {
    res.json(trainData.trains)
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
