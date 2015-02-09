# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weeklyshowtimes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='showtimeweekday',
            options={'verbose_name': 'Day of Week', 'verbose_name_plural': 'Days', 'ordering': ('_order',)},
        ),
        migrations.RemoveField(
            model_name='showtimeweekday',
            name='order',
        ),
        migrations.AddField(
            model_name='showtimeweekday',
            name='_order',
            field=models.IntegerField(verbose_name='Order', null=True),
            preserve_default=True,
        ),
    ]
