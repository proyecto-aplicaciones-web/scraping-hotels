import requests
def close_splash():
    url = 'http://localhost:8050/stop'
    response = requests.post(url)
    if response.status_code == 200:
        print('El servidor Splash se cerró correctamente.')
    else:
        print('Hubo un error al cerrar el servidor Splash.')
        
close_splash()