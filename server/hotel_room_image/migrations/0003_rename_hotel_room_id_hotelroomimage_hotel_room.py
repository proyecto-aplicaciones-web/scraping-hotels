# Generated by Django 4.2 on 2023-06-03 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hotel_room_image', '0002_alter_hotelroomimage_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hotelroomimage',
            old_name='hotel_room_id',
            new_name='hotel_room',
        ),
    ]
