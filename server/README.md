## How to execute the code

To create the virtual environment download the "virtualenv" library via pip.

<br>

Windows:

```
pip install virtualenv 
```

Linux:

```
pip3 install virtualenv 
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
In Windows:<br>

```
.\venv\Scripts\activate
```

In Linux:

```
source venv\bin\activate
```

<br>
Perform the dependency installations (try to have executed the virtual environment):

Windows:

```
pip install -r requirements.txt
```

Linux:

```
pip3 install -r requirements.txt
```

<br>
Perform the dependency installations (try to have run the virtual environment):

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