# openstreetmap-on-heroku


Start the app without any dynos or with all dynos working (no crash !)
Prepare the database through = "heroku run --app my-heroku-app bash" : 

  psql $DATABASE_URL
  
    CREATE EXTENSION postgis;
    CREATE EXTENSION hstore;
    
    CREATE TABLE "mytable" ("osm_id"  bigint, "osm_type"  text, "properties"  hstore, "geometry"  geometry);


With a buildpack already installed (nodejs) : 
heroku buildpacks:add --index 1 heroku-community/apt --app openstreetmap-on-heroku

Add nginx : 
heroku buildpacks:add heroku-community/nginx --app openstreetmap-on-heroku

Check : 
heroku buildpacks --app openstreetmap-on-heroku

Execute once osm2pgsql : 
echo $DATABASE_URL
osm2pgsql -c -d DATABASE_NAME --slim map.osm --style default.style -H DATABASE_HOST -W -U DATABASE_USERNAME --number-processes 1

Reminder : looking at the logs : 
heroku logs --tail --app openstreetmap-on-heroku
