import requests

splash_url = 'http://localhost:8050/render.html'
url = 'http://example.com'

params = {
    'url': url,
    'wait': 0.5
}

response = requests.get(splash_url, params=params)

if response.status_code == 200:
    print("Splash server is working.")
else:
    print("There was an error with the Splash server.")
