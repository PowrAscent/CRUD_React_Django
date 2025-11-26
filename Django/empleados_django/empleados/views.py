from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from empleados.models import Empleados
from empleados.serializers import EmpleadoSerializer


class EmpleadosGetPost(APIView):

    def get(self, request):
        empleados = Empleados.objects.all()
        serializer = EmpleadoSerializer(empleados, many=True)
        return Response(serializer.data)
