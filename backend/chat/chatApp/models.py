from django.db import models

# Create your models here.

class Person(models.Model):
    personName = models.CharField(max_length=64,unique=True)
    personAge = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.personName

