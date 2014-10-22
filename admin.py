from copy import deepcopy

from django.contrib import admin
from mezzanine.pages.admin import PageAdmin
from mezzanine.pages.models import RichTextPage


# add the featured image to page subclasses in the admin
page_fieldsets = deepcopy(PageAdmin.fieldsets)
page_fieldsets[0][1]["fields"] += ("featured_image", "silhouette_image", "quote_text", "quote_byline",)


PageAdmin.fieldsets = page_fieldsets

admin.site.unregister(RichTextPage)
admin.site.register(RichTextPage, PageAdmin)
