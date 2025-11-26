from django.core.management.base import BaseCommand
from empleados.models import Empleados

class Command(BaseCommand):
    def handle(self, *args, **options):
        lista_empleados = [
            Empleados(nombre='Sammy', apellido='Reyes', puesto='Desarrollador', salario=1500000, fecha_ingreso='2025-12-22', activo=True, telefono='972123485', direccion='La Paz', departamento='Logistica', email='sammy@gmail.com'),
            Empleados(nombre='Luciano', apellido='Andrades', puesto='Diseñador', salario=800000, fecha_ingreso='2025-08-24', activo=True, telefono='990214566', direccion='Don Mateo 123', departamento='Publicidad', email='luciano@gmail.com'),
        ]
        Empleados.objects.bulk_create(lista_empleados)
        self.stdout.write('Clientes registrados correctamente!')