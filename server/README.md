# How to execute the code


## To create Splash server to make scraping with JavaScript downloaded components
<br>

Create a docker with Splash to scrapy :

```
docker run --name mi_splash -p 8050:8050 scrapinghub/splash
```
<br>
To verify if Splash server was created successfully, search the next link in a browser:

```
http://localhost:8050/
```

<br>
If you want to close the container (Linux):

```
sudo docker stop mi_splash
```


If you want to open the container again (Linux):

```
sudo docker start mi_splash
```
<br>

**Note**: If you run the code to scrapy without to start the splash server, the spiders will only turn on and then turn off immediately.

<br>
<hr>


## To create the virtual environment with venv.

Download the code:

```
git clone git@github.com:proyecto-aplicaciones-web/scraping-hotels.git
```

Go to the backend folder:

```
cd server/
```



<br> 

Create the virtual environment with named "venv"

<br>
Windows:

```
python -m venv venv
```

Linux:

```
python3 -m venv venv
```

<br>
To run the virtual environment (from the root folder): <br>
In Windows (Powershell):<br>

```
.\venv\Scripts\activate
```

In Linux:

```
source venv\bin\activate
```

<br>
Perform dependency installations (remember running the virtual environment):

Windows:

```
pip install -r requirements.txt
```

Linux:

```
pip3 install -r requirements.txt
```

<br>
Perform the dependency installations (remember running the virtual environment):

Windows:

```
python manage.py makemigrations
python manage.py migrate
```

Linux:

```
python3 manage.py makemigrations
python3 manage.py migrate
```

<br>
To run the Django server (in development mode):

```
python manage.py runserver
```

<br>
To close the virtual environment:

```
deactivate
``` 

# Considerations
A **.env** file must be created to set the pertinent state variables, just as it is in the **.env.example** file, there the specifications for the connection to the database will be defined. via Postgres.<br><br>
In Postgres you have to create a database with the same name as defined in the **.env** file for the ***NAME_DATABASE*** variable to establish the connection between Django and the database in Postgres.