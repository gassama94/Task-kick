# Generated by Django 4.2.7 on 2023-11-05 14:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mytask', '0003_alter_profile_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='updated',
            new_name='updated_at',
        ),
    ]
