from django.contrib import admin
from .models import Section, WeekDay, TicketPrice, TicketsSchedule
from mezzanine.core.admin import TabularDynamicInlineAdmin


class TicketScheduleForm(admin.ModelAdmin):
    model = TicketsSchedule

    def status_name(self):
        if self.status == "1":
            return "Active"
        else:
            return "Inactive"

    list_display = ['name', 'status_name']


class SectionForm(TabularDynamicInlineAdmin):
    model = Section
    list_display = 'name'


class WeekDayForm(admin.ModelAdmin):
    model = WeekDay
    list_display = 'name'


class TickPriceAdmin(admin.ModelAdmin):
    section = SectionForm
    week_day = WeekDayForm


admin.site.register(TicketsSchedule)
admin.site.register(Section)
admin.site.register(WeekDay)
admin.site.register(TicketPrice, TickPriceAdmin)
