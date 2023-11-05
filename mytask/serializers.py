from rest_framework import serializers
from .models import Mytask, Profile


class MytaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mytask
    # field = ('id', 'title', 'description', 'completed')
    fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'location', 'birth_date']
        # If you want to include all fields, you can use:
        # fields = '__all__'