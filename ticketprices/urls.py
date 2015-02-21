from django.conf.urls import patterns, url
from .views import TicketList

urlpatterns = patterns('', url(r'^tickets/$', TicketList.as_view()),)
