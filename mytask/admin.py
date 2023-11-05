from django.contrib import admin
from .models import Mytask, Profile

# Register your models here.
class MytaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('owner', 'created_at', 'updated', 'image')

# Register Admin
admin.site.register(Mytask, MytaskAdmin)
admin.site.register(Profile, ProfileAdmin)
