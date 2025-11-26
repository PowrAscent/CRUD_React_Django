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

    def post(self, request):
        serializer = EmpleadoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EmpleadoGetPutDelete(APIView):

    def put(self, request, id):
        empleado = Empleados.objects.get(id=id)
        serializer = EmpleadoSerializer(empleado, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try:
            empleado = Empleados.objects.get(id=id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        empleado.delete()
        return Response(status=status.HTTP_200_OK)