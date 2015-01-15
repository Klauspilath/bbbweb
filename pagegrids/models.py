from __future__ import unicode_literals
from future.builtins import str

from django.db import models
from django.utils.translation import ugettext_lazy as _
from mezzanine.conf import settings
from mezzanine.core.models import Displayable, Ownable, RichText, Orderable
from mezzanine.pages.models import Page


class PageGrid(models.Model):
    grid_title = models.CharField(_("Grid Title"), max_length=1000, blank=True)


    class Meta:
        verbose_name = _("Page Grid")
        verbose_name_plural = _("Page Grids")


class GridRow(Orderable):
    title = models.CharField(_("value"), max_length=1000, blank=True)
    grid = models.ForeignKey("PageGrid", related_name="page_grid")


class GridCell(models.Model):
    value = models.CharField(_("value"), max_length=1000, blank=True)
    row = models.ForeignKey("GridRow", related_name="grid_row")


