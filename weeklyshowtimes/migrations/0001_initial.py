# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShowTime',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('time', models.CharField(verbose_name='Time', max_length=10, blank=True)),
                ('age_limit', models.CharField(verbose_name='Age Limit', max_length=25, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Show Times',
                'verbose_name': 'Show Time',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ShowTimeWeekDay',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('name', models.CharField(verbose_name='Day of Week', max_length=10, blank=True)),
                ('order', models.CharField(verbose_name='Display Order', max_length=2, blank=True)),
            ],
            options={
                'ordering': ('order',),
                'verbose_name_plural': 'Days',
                'verbose_name': 'Day of Week',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='showtime',
            name='week_day',
            field=models.ForeignKey(to='weeklyshowtimes.ShowTimeWeekDay'),
            preserve_default=True,
        ),
    ]
