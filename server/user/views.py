from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from rest_auth.registration.views import SocialLoginView
from .models import *
from .serializers import *

# Create your views here.
@csrf_exempt
@api_view(['GET'])
def get_users_count(request):
    try:
        count = User.objects.count()
        return Response({'count': count}, status=status.HTTP_200_OK)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['GET'])
def get_users(request):
    try:
        users = User.objects.all().order_by('id')
        for user in users:
            user.password = ''
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@csrf_exempt
@api_view(['GET'])
def get_users(request):
    try:
        users = User.objects.all().order_by('id')
        for user in users:
            user.password = ''
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['GET'])
def get_user(request, user_id):
    try:    
        user = User.objects.get(pk=user_id)
        user.password = ''
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except BaseException:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def create_user(request):
    request.data['password'] = make_password(request.data['password'])
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PATCH'])
def modify_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    
@csrf_exempt
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.get(email=email)
    is_password_correct = check_password(password, user.password)
    if user is not None and is_password_correct:
        access_token = AccessToken.for_user(user)
        token = str(access_token)
        user.password = ''
        serializer = UserSerializer(user)
        return Response({**serializer.data, 'token': token}, status.HTTP_200_OK)
    else:
        if not user.state:
            return Response({'error': 'User inactive'}, status=401)
        # Invalid credentials
        return Response({'error': 'Invalid credentials'}, status=401)

# class GoogleLogin(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter 

@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
    token = request.data.get('access_token')
    user = request.backend.do_auth(token)
    print(request)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {
                'token': token.key
            },
            status=status.HTTP_200_OK,
            )
    else:
        return Response(
            {
                'errors': {
                    'token': 'Invalid token'
                    }
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET', 'POST'])
def authentication_test(request):
    print(request.user)
    return Response(
        {
            'message': "User successfully authenticated"
        },
        status=status.HTTP_200_OK,
    )