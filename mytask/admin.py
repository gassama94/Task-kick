from django.contrib import admin
from .models import Mytask

# Register your models here.


class MytaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register Admin


admin.site.register(Mytask, MytaskAdmin)
