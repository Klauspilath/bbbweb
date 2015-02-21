from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mezzanine.core.models import Orderable


STATUS_CHOICES = (
    ("1", 'Active'),
    ("0", 'Inactive'),
)


class Section(Orderable):
    name = models.CharField(max_length=40,
                            verbose_name=_("Seating Section"),
                            blank=True,
                            null=False,
                            editable=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")
        ordering = ("_order",)

    def save(self, *args, **kwargs):
        super(Section, self).save(*args, **kwargs)


class WeekDay(Orderable):
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
        ordering = ("_order",)

    def save(self, *args, **kwargs):
        super(WeekDay, self).save(*args, **kwargs)


class TicketsSchedule(models.Model):
    name = models.CharField(max_length=10,
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


class TicketPrice(models.Model):
    schedule = models.ForeignKey(TicketsSchedule)
    section = models.ForeignKey(Section)
    week_day = models.ForeignKey(WeekDay)
    price = models.CharField(max_length=4,
                             verbose_name=_("Ticket Price"),
                             blank=True,
                             null=False)

    class Meta:
        verbose_name = _("Ticket Price")
        verbose_name_plural = _("Ticket Prices")
        ordering = ("section", "week_day")

