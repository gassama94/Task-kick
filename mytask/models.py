from django.db import models


class Mytask(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __stys__(self):
        return self.title