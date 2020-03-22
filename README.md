# openstreetmap-on-heroku


Start the app without any dynos or with all dynos working (no crash !)
Prepare the database through = "heroku run --app my-heroku-app bash" : 

  psql $DATABASE_URL
  
    CREATE EXTENSION postgis;
    CREATE EXTENSION hstore;
    
    CREATE TABLE "mytable" ("osm_id"  bigint, "osm_type"  text, "properties"  hstore, "geometry"  geometry);


With a buildpack already installed (nodejs) : 
heroku buildpacks:add --index 1 heroku-community/apt

Check : 
heroku buildpacks --app openstreetmap-on-heroku
