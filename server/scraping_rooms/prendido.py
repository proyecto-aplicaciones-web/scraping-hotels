import requests


def start_splash():
    url = 'http://localhost:8050/api/v1/services'
    payload = {
        'image': 'splash',
        'args': ['splash', '--disable-lua-sandbox'],
        'port': 8050,
        'wait': 0,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        print('El servidor Splash se inició correctamente.')
    else:
        print('Hubo un error al iniciar el servidor Splash.') 
        
start_splash()
        
        