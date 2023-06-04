from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.

@csrf_exempt
@api_view(['GET'])
def get_news(request):
    limit = request.GET.get('limit', None)
    try:
        news = New.objects.all().order_by('-updatedAt')
        if limit is not None:
            news = news[:int(limit)]
        serializer = NewSerializer(news, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except New.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['GET'])
def get_new(request, new_id):
    try:
        new = New.objects.get(pk=new_id)
        serializer = NewSerializer(new)
        return Response(serializer.data)
    except New.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def create_new(request):
    serializer = NewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PATCH'])
def modify_new(request, new_id):
    try:    
        new = New.objects.get(pk=new_id)
    except BaseException:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = NewSerializer(new, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['DELETE'])
def delete_new(request, new_id):
    try:
        new = New.objects.get(pk=new_id)
        new.delete()
        return Response(status=status.HTTP_200_OK)
    except New.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)