from django.contrib import admin

from empleados.models import Empleados

class empleadoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'apellido', 'puesto', 'salario', 'fecha_ingreso', 'activo', 'telefono', 'direccion', 'departamento', 'email']

admin.site.register(Empleados, empleadoAdmin)