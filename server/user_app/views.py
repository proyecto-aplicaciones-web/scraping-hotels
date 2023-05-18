from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt #! Should be erased eventually.
from .models import User

import json

# User

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            first_name = data.get('first_name')
            last_name = data.get('last_name') 
            password = data.get('password')
            role = data.get('role') 
            email  = data.get('email')
            User.create_user(first_name, last_name, password, role, email)
            return JsonResponse({'status': "OK",
                                'message': "User created",
                                'user': {
                                      'first_name': first_name,
                                      'last_name': last_name,
                                      'password': password,
                                      'state': True,
                                      'email': email
                                }}, status=200)
        except Exception as e:
            print("ERROR:",e)
            return JsonResponse({'status': 'ERROR', 
                                 'message': 'Fields not allowed'
                                }, status=400)  
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'HTTP method not allowed'}, status=405)
    

@csrf_exempt
def modify_user(request, user_id):
    if request.method == 'PUT':
        try:
            user = User.objects.get(user_id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            first_name = data.get('first_name', None)
            last_name = data.get('last_name', None) 
            role = data.get('role', None) 
            password = data.get('password', None)  

            user.modify_user(
                first_name =first_name,
                last_name = last_name,
                role=role,
                password = password,
            )

            return JsonResponse({'status': "OK",
                                'message': "User created",
                                'user': {
                                      'first_name': first_name,
                                      'last_name': last_name,
                                      'password': password,
                                      'role': role,
                                      'state': user.state,
                                }}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'User doesn\'t exist'}, status=404)  
        except:
            return JsonResponse({'status': 'ERROR', 'message': 'Fields not allowed'}, status=400)  
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'HTTP method not allowed'}, status=405)
    
@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = User.objects.get(user_id=user_id)  

            user.delete_user()
            
            return JsonResponse({'status': "OK",
                                'message': "User deleted",
                                'user': {
                                      'first_name': user.first_name,
                                      'last_name': user.last_name, 
                                      'role': user.role,
                                      'state': user.state,
                                }}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'User doesn\'t exist'}, status=404)  
        except:
            return JsonResponse({'status': 'ERROR', 'message': 'Fields not allowed'}, status=400)  
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'HTTP method not allowed'}, status=405)
    
@csrf_exempt
def get_user(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(user_id=user_id)  
            return JsonResponse({'status': "OK", 
                                'user': {
                                      'first_name': user.first_name,
                                      'last_name': user.last_name, 
                                      'password': user.password,
                                      'role': user.role,
                                      'state': user.state,
                                }}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'message': 'User doesn\'t exist'}, status=404)   
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'HTTP method not allowed'}, status=405)
    

@csrf_exempt
def get_users(request):
    if request.method == 'GET': 
        users = User.get_users()
        return JsonResponse({'status': "OK", 
                            'users': list(users.values('user_id','first_name','last_name','password','role','state'))
                            }, status=200)   
    else:
        return JsonResponse({'status': 'ERROR', 'message': 'HTTP method not allowed'}, status=405)
