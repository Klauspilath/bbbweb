from django.contrib import admin
from .models import ShowTime, ShowTimeWeekDay


class ShowTimeWeekDayForm(admin.ModelAdmin):
    model = ShowTimeWeekDay
    list_display = 'name'


class ShowTimeAdmin(admin.ModelAdmin):
    week_day = ShowTimeWeekDayForm

admin.site.register(ShowTimeWeekDay)
admin.site.register(ShowTime, ShowTimeAdmin)
