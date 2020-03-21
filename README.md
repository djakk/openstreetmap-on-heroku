# openstreetmap-on-heroku


Start the app without any dynos or with all dynos working (no crash !)
Prepare the database through heroku run : 

  psql $DATABASE_URL
  
    CREATE EXTENSION postgis;
    CREATE EXTENSION hstore;
    
    CREATE TABLE "mytable" ("osm_id"  bigint, "osm_type"  text, "properties"  hstore, "geometry"  geometry);
