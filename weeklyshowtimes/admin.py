from django.contrib import admin
from .models import ShowTime, ShowTimeWeekDay, ShowTimeSchedule


class ShowTimeWeekDayForm(admin.ModelAdmin):
    model = ShowTimeWeekDay
    list_display = 'name'


class ShowTimeScheduleForm(admin.ModelAdmin):
    model = ShowTimeSchedule

    def status_name(self):
        if self.status == "1":
            return "Active"
        else:
            return "Inactive"

    list_display = ['name', 'status_name']


class ShowTimeAdmin(admin.ModelAdmin):
    week_day = ShowTimeWeekDayForm
    schedule = ShowTimeScheduleForm

    def schedule_name(self):
        return "%s" % self.schedule.name

    def week_day_name(self):
        return "%s" % self.week_day.name

    list_display = [schedule_name, week_day_name, 'time']


admin.site.register(ShowTimeWeekDay)
admin.site.register(ShowTimeSchedule)
admin.site.register(ShowTime, ShowTimeAdmin)
