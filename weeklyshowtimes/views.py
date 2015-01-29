from django.shortcuts import render
from django.views.generic import ListView
from .models import ShowTime
# Create your views here.


class ShowtimeList(ListView):
    model = ShowTime
    template_name = 'weeklyshowtimes/showtimes_list.html'
