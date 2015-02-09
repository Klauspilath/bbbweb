# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weeklyshowtimes', '0002_auto_20150209_1349'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='showtimeweekday',
            options={'verbose_name': 'Day of Week', 'verbose_name_plural': 'Days'},
        ),
        migrations.RemoveField(
            model_name='showtimeweekday',
            name='_order',
        ),
    ]
