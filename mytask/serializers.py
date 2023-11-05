from rest_framework import serializers
from .models import Mytask, Profile


class MytaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mytask
    # field = ('id', 'title', 'description', 'completed')
    fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')
  is_owner = serializers.SerializerMethodField()

  def get_is_owner(self, obj):
    request = self.context.get('request')
    if request and hasattr(request, 'user'):
      return request.user == obj.owner
    

  class Meta:
        model = Profile
        fields = ['id', 'owner', 'created_at', 'updated_at', 'name', 'content',  'image', 'is_owner']
        