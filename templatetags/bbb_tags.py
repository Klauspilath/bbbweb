from __future__ import unicode_literals
from django import template
from bbb.galleries.models import Gallery

register = template.Library()

@register.inclusion_tag('includes/tags/gallery_images.html')
def get_gallery(name):
    gallery = Gallery.objects.filter(slug=name)
    Gallery.objects.filter()
    gallery.filter().latest()
    return {"gallery": gallery}


@register.inclusion_tag('includes/tags/get-tickets-button.html')
def get_tickets_button(link, target=None):
    return_target = False
    if target is not None:
        return_target = target

    return {"link": link, "target": return_target}
