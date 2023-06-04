from django.views.decorators.csrf import csrf_exempt 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.
@csrf_exempt
@api_view(['GET'])
def get_images_by_room_id(request, room_id):
    try:
        images = HotelRoomImage.objects.filter(hotel_room_id=room_id)
        serializer = HotelRoomImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except HotelRoomImage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['POST'])
def create_hotel_room_image(request):
    serializer = HotelRoomImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
def delete_hotel_room_image(request, image_id):
    try:
        image = HotelRoomImage.objects.get(pk=image_id)
        image.delete()
        return Response(status=status.HTTP_200_OK)
    except HotelRoomImage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)