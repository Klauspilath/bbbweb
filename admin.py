from copy import deepcopy
from django.contrib import admin
from mezzanine.pages.admin import PageAdmin
from mezzanine.pages.models import RichTextPage
from mezzanine.forms.models import Form, Field
from mezzanine.forms.admin import FormAdmin, FieldAdmin

from mezzanine.pages.models import Link
from mezzanine.pages.admin import LinkAdmin


page_fieldsets = deepcopy(PageAdmin.fieldsets)
page_fieldsets[0][1]["fields"] += ("featured_image", "silhouette_image", "quote_text", "quote_byline",)

PageAdmin.fieldsets = page_fieldsets

admin.site.unregister(RichTextPage)
admin.site.register(RichTextPage, PageAdmin)

link_fieldsets = deepcopy(LinkAdmin.fieldsets)
link_fieldsets[0][1]["fields"] += ("feature_image",)


class NewLinkAdmin(LinkAdmin):
    fieldsets = link_fieldsets


admin.site.unregister(Link)
admin.site.register(Link, NewLinkAdmin)

form_fieldsets = deepcopy(FormAdmin.fieldsets)
form_fieldsets[0][1]["fields"] += ["show_sig_confirm", "signature_content", ]


class NewFormAdmin(FormAdmin):
    fieldsets = form_fieldsets
    inlines = (FieldAdmin,)

FormAdmin.fieldsets = form_fieldsets

admin.site.unregister(Form)
admin.site.register(Form, NewFormAdmin)








