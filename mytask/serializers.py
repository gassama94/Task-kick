from rest_framework import serializers
from .models import Mytask, Profile


class MytaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mytask
    # field = ('id', 'title', 'description', 'completed')
    fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')

  class Meta:
        model = Profile
        fields = ['id', 'owner', 'created_at', 'updated_at', 'name', 'content',  'image']
        