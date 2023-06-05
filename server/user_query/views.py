from django.views.decorators.csrf import csrf_exempt 
from rest_framework.decorators import api_view
from django.db.models import Count
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

@csrf_exempt
@api_view(['GET'])
def get_all_user_query(request):
    try:
        user_queries = UserQuery.objects.all().order_by('id')
        serializer = UserQuerySerializer(user_queries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except user_queries.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['GET'])
def get_most_visited_rooms(request):
    try:
        top_hotel_rooms = UserQuery.objects.values('hotel_room_id').annotate(count=Count('hotel_room_id')).order_by('-count')[:5]
        hotel_room_ids = [item['hotel_room_id'] for item in top_hotel_rooms]
        room_count_dict = {item['hotel_room_id']: item['count'] for item in top_hotel_rooms}
        hotel_rooms = HotelRoom.objects.filter(id__in=hotel_room_ids)
        serializer = HotelRoomSerializer(hotel_rooms, many=True)
        rooms_with_count = []
        for room in serializer.data:
            rooms_with_count.append({**room, 'visits': room_count_dict[room['id']]})
        return Response(sorted(rooms_with_count, key=lambda x: x['visits'], reverse=True), status=status.HTTP_200_OK)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['GET'])
def get_visited_rooms_by_user_id(request, user_id):
    try:
        user_rooms = UserQuery.objects.filter(user_id=user_id)
        hotel_room_ids = []
        for user in user_rooms:
            hotel_room_ids.append(user.hotel_room_id.id)
        hotel_rooms = HotelRoom.objects.filter(id__in=hotel_room_ids)
        serializer = HotelRoomSerializer(hotel_rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['POST'])
def create_user_query(request):
    user_id = request.data.get('user_id')
    hotel_room_id = request.data.get('hotel_room_id')
    userQuery = UserQuery.objects.filter(user_id=user_id, hotel_room_id=hotel_room_id)
    if userQuery.exists():
        return Response(status=status.HTTP_202_ACCEPTED)
    serializer = UserQuerySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
