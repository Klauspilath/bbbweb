from django.db import models

# Create your models here.



class Section(Displayable, Ownable):
    name = models.CharField()
