from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mezzanine.core.models import Orderable


class Section(Orderable):
    name = models.CharField(max_length=40,
                            verbose_name=_("Seating Section"),
                            blank=True,
                            null=False,
                            editable=True)

    def __str__(self):
        return (self.name)

    class Meta:
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")
        ordering = ("order",)

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
        ordering = ("order",)


    def save(self, *args, **kwargs):
        super(WeekDay, self).save(*args, **kwargs)


class TicketPrice(models.Model):
    section = models.ForeignKey(Section)
    week_day = models.ForeignKey(WeekDay)
    price = models.CharField(max_length=4,
                             verbose_name=_("Ticket Price"),
                             blank=True,
                             null=False)

    class Meta:
        verbose_name = _("Ticket Price")
        verbose_name_plural = _("Ticket Prices")

    def __str__(self):
        return "%s -- %s -- %s" % (self.section.name, self.week_day.name, self.price)
