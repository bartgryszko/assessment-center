# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('qa', '0002_auto_20150223_1044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='is_public',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='question',
            name='is_accepted',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
