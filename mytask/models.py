from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Mytask(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Profile Model
class Profile(models.Model):
    # Additional fields for the profile
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mytask_profile')
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_fvwztb'
    )


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"

# Signal to create a profile for newly created users
@receiver(post_save, sender=User)
def create_Profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_Profile, sender=User)