from django.db import models

class Empleados(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    puesto = models.CharField(max_length=50)
    salario = models.IntegerField()
    fecha_ingreso = models.DateField()
    activo = models.BooleanField()
    telefono = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

