from __future__ import unicode_literals
from django import template
from mezzanine.galleries.models import Gallery

register = template.Library()

@register.inclusion_tag('includes/gallery_images.html')
def get_gallery(name):
    gallery = Gallery.objects.filter(slug=name)
    Gallery.objects.filter()
    gallery.filter().latest()
    return {"gallery": gallery}


@register.inclusion_tag('includes/bbb/get-tickets-button.html')
def get_tickets_button():
    return
