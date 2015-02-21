from django.views.generic import ListView
from .models import ShowTime

class ShowtimeList(ListView):
    model = ShowTime
    template_name = 'weeklyshowtimes/showtimes_list.html'
