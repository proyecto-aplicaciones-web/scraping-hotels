# Create your views here.
#Django
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_exempt 
import json
from django.utils.decorators import method_decorator
from django.db.utils import IntegrityError
from django.utils import timezone
from django.contrib.auth import authenticate
from django.db.models.functions import Lower
from django.http import JsonResponse
from django.http import Http404
from django.shortcuts import render
#Restframework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status, generics
from rest_framework import authentication, permissions
from rest_framework.exceptions import NotFound
#locals
from .models import *
from .serializers import *


# User

@csrf_exempt
@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    if request.method == 'GET':   
        return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()    
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

   
@csrf_exempt
@api_view(['GET'])
def get_user(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
@csrf_exempt
@api_view(['PUT'])
def modify_user(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#CRUDS NEWS

#CREATE
#@method_decorator(csrf_exempt, name='dispatch')
class NewsCreate(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    # create a method POST with a try except for the use of fixs.
    def post(self, request):
        # Create an object of the class NewsSerializer, using the request.data
        serializer = NewsSerializer(data=request.data)
        # If the serializer is True 
        if serializer.is_valid():
            # Save the serializer 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Class List
class NewsList(generics.ListAPIView):
    serializer_class = NewsSerializer
    model = News
    permission_classes = [permissions.AllowAny]
    queryset = News.objects.all()

#Search for id

@method_decorator(csrf_exempt, name='dispatch')
class NewsId(generics.GenericAPIView):

    serializer_class = NewsSerializer
    model = News
    permission_classes = [permissions.AllowAny]
    queryset = News.objects.all()

    def getNews(self, news_id):
        try:
            return News.objects.get(news_id=news_id)
        except News.DoesNotExist:
            raise Http404("The new not exist")

    def get(self, request: Response, news_id=''):

        new = self.getNews(news_id)
        serializer = NewsSerializer(new, many=False)
        return Response(data=serializer.data)



#DELETE

# Delete User with id

class NewsDelete(generics.GenericAPIView):

    serializer_class = NewsSerializer
    model = News
    permission_classes = [permissions.AllowAny]
    queryset = News.objects.all()

    def getNews(self, news_id):
        try:
            return News.objects.get(news_id=news_id)
        except News.DoesNotExist:
            raise Http404("No exist New")

    def delete(self, request, news_id='', format=None):
        news = self.getNews(news_id)

        if news.delete():
            return Response(status=status.HTTP_200_OK, data={"Delete"})
        return Response(status=status.HTTP_204_NO_CONTENT)
@csrf_exempt
@api_view(['GET','DELETE'])
def delete_user(request, user_id):
    user = User.objects.get(pk=user_id)
    data=request.data
    serializer = UserSerializer(user, data)
    if request.method == 'DELETE':
        data.state = False
        if data.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
