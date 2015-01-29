from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class ShowTimeWeekDay(models.Model):
    name = models.CharField(max_length=10,
                            verbose_name=_("Day of Week"),
                            blank=True,
                            null=False,
                            editable=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Day of Week")
        verbose_name_plural = _("Days")



class ShowTime(models.Model):
    week_day = models.ForeignKey(ShowTimeWeekDay)
    time = models.CharField(max_length=10,
                            verbose_name=_("Time"),
                            blank=True,
                            null=False)

    age_limit = models.CharField(max_length=25,
                                 verbose_name=_("Age Limit"),
                                 blank=True,
                                 null=False)

    def __str__(self):
        return "%s -- %s -- %s" % (self.week_day.name, self.time, self.age_limit)

    class Meta:
        verbose_name = _("Show Time")
        verbose_name_plural = _("Show Times")

