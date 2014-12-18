from mezzanine.utils.views import render
from django.template import loader


def member(request, slug):
    template = loader.get_template("pages/production/cast_and_crew.html",)
    return render(request, template)
