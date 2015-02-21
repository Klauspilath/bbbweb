from django.views.generic import ListView
from .models import TicketPrice

class TicketList(ListView):
    model = TicketPrice
    template_name = "ticketprices/ticketprices_list.html"
