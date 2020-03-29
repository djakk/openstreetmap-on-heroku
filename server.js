"use strict";

const express = require('express');
const mapnik = require('mapnik');

const app = express();

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

const proj4 =
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs';

const the_database_url = new URL(process.env.DATABASE_URL);
const dbConfig = {
    type: 'postgis',
    host: the_database_url.hostname, 
    port: the_database_url.port, 
    dbname: the_database_url.pathname.substring(1), 
    user: the_database_url.username,
    password: the_database_url.password, 
    table: "(SELECT way, 'red' AS colour FROM planet_osm_line) AS roads", 
    geometry_field: 'way'
};

// many thanks to https://smallmultiples.com.au/articles/building-large-maps-with-a-node.js-tile-server/ !!
const createVectorTile = (sql,{ x, y, z }) => {
  const map = new mapnik.Map(256, 256, proj4);
  let layer = new mapnik.Layer('tile', proj4);
  layer.datasource = new mapnik.Datasource(
    dbConfig
  );
  map.add_layer(layer);
  try {
    const vector = new mapnik.VectorTile(
      parseFloat(z), parseFloat(x), parseFloat(y)
    );
  } catch {
    const vector = void;
  };
  
  return new Promise((res, rej) => {
    map.render(vector, (err, vectorTile) => {
      if (err) return rej(err);
      
      vectorTile.getData((err, buffer) => {
        if (err) return rej(err);
        
        return res(buffer);
      });
    });
  });
};


app.get('/:x/:y/:z.mvt', async (req, res) => {
  const sql = 'select geom from geo_table';
  const tile = await createVectorTile(
    sql,
    req.params
  );
  if (tile) {
    res.setHeader(
        'Content-Type',
        'application/x-protobuf'
      );
    res.status(200);
    res.send(tile);
  }
  else {
    res
      .setHeader(
          'Content-Type',
          'text/html'
        )
      .status(500)
      .send('Error inside createVectorTile :-(');
  };
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

