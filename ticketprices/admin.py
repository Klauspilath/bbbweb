from django.contrib import admin
from .models import Section, WeekDay, TicketPrice


class SectionInput(admin.ModelAdmin):
    model = Section
    list_display = 'name'


class WeekDayInput(admin.ModelAdmin):
    model = WeekDay
    list_display = 'name'


class TickPriceAdmin(admin.ModelAdmin):
    section = SectionInput
    week_day = WeekDayInput

admin.site.register(Section)
admin.site.register(WeekDay)
admin.site.register(TicketPrice, TickPriceAdmin)
