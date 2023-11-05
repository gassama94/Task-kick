from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from django.http import Http404

# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(APIView):
  def get_object(self, pk):
    try:
      return  Users.objects.get(pk=pk)
    except Users.DoesNotExist:
      raise Http404

  def get(self, request, pk):
      user = self.get_object(pk)
      serializer = usersSerializer(user)
      return Response(serializer.data)