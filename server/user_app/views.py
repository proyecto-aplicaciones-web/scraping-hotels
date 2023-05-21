# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# User

@csrf_exempt
@api_view(['GET'])
def get_users(request):
    try:
        users = User.objects.all().filter(state=True)
        serializer = UserSerializer(users, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def create_user(request):
    try:
        serializer = UserSerializer(data = request.data)
        serializer.save()    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except BaseException:
        return Response(status=status.HTTP_400_BAD_REQUEST)

   
@csrf_exempt
@api_view(['GET'])
def get_user(request, user_id):
    try:    
        user = User.objects.get(pk=user_id)
        user_status = user.state
        if user_status == True:
            serializer = UserSerializer(user)
            return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@csrf_exempt
@api_view(['PUT'])
def modify_user(request, user_id):
    try:    
        user = User.objects.get(pk=user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except BaseException:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user.state= False
        user.save()
        return Response(status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)