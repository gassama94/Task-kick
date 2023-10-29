from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MytaskSerializer
from .models import Mytask



# Create your views here.
class MytaskView(viewsets.ModelViewSet):
  serializer_class = MytaskSerializer
  queryset = Mytask.objects.all()