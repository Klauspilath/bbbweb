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
def get_tickets_button(link, **kwargs):
    return_target = False
    return_phone = False

    if kwargs is not None:

        if kwargs['target']:
            return_target = True

        if kwargs['link_phone'] is not "":
            return_phone = True

    return {"link": link, "target": return_target, "link_phone": return_phone}


@register.inclusion_tag('includes/tags/submit-button.html')
def submit_button(text):
    return {"text": text}


@register.inclusion_tag("includes/tags/form_fields.html", takes_context=True)
def fields_for(context, form):
    """
    Renders fields for a form.
    """
    context["form_for_fields"] = form
    return context


@register.inclusion_tag("includes/tags/form_errors.html", takes_context=True)
def errors_for(context, form):
    """
    Renders an alert if the form has any errors.
    """
    context["form"] = form
    return context
