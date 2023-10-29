from rest_framework import serializers
from .models import Mytask


class MytaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mytask
    # field = ('id', 'title', 'description', 'completed')
    fields = '__all__'