from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    # Additional fields for the profile
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        upload_to='images/', default='../defualt_profile_fvwztb'
    )


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"
    
def create_Profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_Profile, sender=User)

