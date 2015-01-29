from django.conf.urls import patterns, url
from .views import ShowtimeList

urlpatterns = patterns('',
                       url(r'^showtimes/$', ShowtimeList.as_view()),
)
