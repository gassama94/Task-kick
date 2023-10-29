from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'location', 'birth_date']
        # If you want to include all fields, you can use:
        # fields = '__all__'
