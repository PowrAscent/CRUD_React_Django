from django.contrib import admin
from django.urls import path
from empleados import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/empleados/', views.EmpleadosGetPost.as_view()),
    path('api/empleados/<int:id>/', views.EmpleadoGetPutDelete.as_view()),
]
