from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mezzanine.core.models import Orderable


STATUS_CHOICES = (
    ("1", 'Active'),
    ("0", 'Inactive'),
)


class ShowTimeWeekDay(Orderable):
    name = models.CharField(max_length=10,
                            verbose_name=_("Day of Week"),
                            blank=True,
                            null=True,
                            editable=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Day of Week")
        verbose_name_plural = _("Days")
        ordering = ("_order",)


class ShowTimeSchedule(models.Model):
    name = models.CharField(max_length=100,
                            verbose_name=_("Schedule Group"),
                            blank=False,
                            null=False,
                            editable=True)

    status = models.CharField(max_length=10,
                              choices=STATUS_CHOICES,
                              verbose_name=_("Active"),
                              blank=False,
                              null=False,
                              editable=True,
                              default='0')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Schedule")
        verbose_name_plural = _("Schedules")


class ShowTime(Orderable):
    schedule = models.ForeignKey(ShowTimeSchedule)

    week_day = models.ForeignKey(ShowTimeWeekDay)

    time = models.CharField(max_length=10,
                            verbose_name=_("Time"),
                            blank=True,
                            null=False)

    age_limit = models.CharField(max_length=25,
                                 verbose_name=_("Age Limit"),
                                 blank=True,
                                 null=False)

    class Meta:
        verbose_name = _("Show Time")
        verbose_name_plural = _("Show Times")
        ordering = ("week_day","_order")

