# Generated by Django 4.2.3 on 2023-07-27 07:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_book_pdf'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={},
        ),
        migrations.AlterModelTable(
            name='book',
            table='book',
        ),
        migrations.AlterModelTable(
            name='customuser',
            table='CustomUser',
        ),
    ]
