from copy import deepcopy
from django.contrib import admin
from .models import Section, WeekDay, TicketPrice


class SectionInline(admin.ModelAdmin):
    model = Section
    list_display = 'name'


class WeekDayInline(admin.ModelAdmin):
    model = WeekDay
    list_display = 'name'


class TickPriceAdmin(admin.ModelAdmin):
    section = SectionInline
    week_day = WeekDayInline


admin.site.register(Section)
admin.site.register(WeekDay)
admin.site.register(TicketPrice, TickPriceAdmin)
