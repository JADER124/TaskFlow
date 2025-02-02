from django.db import models
from django.contrib.auth.models import User  


class Formulario(models.Model):
   
    nombre = models.CharField(max_length=100, verbose_name="Nombre del formulario")
    descripcion = models.TextField(verbose_name="Descripción", blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuario asociado")

    def __str__(self):
        return self.nombre


class Referencia(models.Model):

    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código de referencia")
    marca = models.CharField(max_length=100, verbose_name="Marca")
    modelo = models.CharField(max_length=100, verbose_name="Modelo")
    serie = models.CharField(max_length=100, verbose_name="Serie")
    capacidad = models.CharField(max_length=100, verbose_name="Capacidad")
    division_escala = models.CharField(max_length=100, verbose_name="División de escala")
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE, related_name="referencias", verbose_name="Formulario asociado")

    def __str__(self):
        return f"{self.marca} {self.modelo} - {self.codigo}"


class Cliente(models.Model):

    nit = models.IntegerField(blank=True, null=True, verbose_name="NIT")
    nombre = models.CharField(max_length=100, verbose_name="Nombre del cliente")
    email = models.EmailField(verbose_name="Correo electrónico")
    telefono = models.CharField(max_length=15, blank=True, null=True, verbose_name="Teléfono")
    direccion = models.CharField(max_length=200, blank=True, null=True, verbose_name="Dirección")
    firma = models.CharField(max_length=100, blank=True, null=True, verbose_name="Firma")
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE, related_name="clientes", verbose_name="Formulario asociado")

    def __str__(self):
        return self.nombre


class Repuesto(models.Model):

    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código del repuesto")
    descripcion = models.CharField(max_length=200, verbose_name="Descripción del repuesto")
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE, related_name="repuestos", verbose_name="Formulario asociado")

    def __str__(self):
        return f"{self.codigo} - {self.descripcion}"


class FormularioDetalle(models.Model):
 
    formulario = models.OneToOneField(Formulario, on_delete=models.CASCADE, related_name="detalle", verbose_name="Formulario asociado")
    comentarios = models.TextField(verbose_name="Comentarios", blank=True, null=True)

    def __str__(self):
        return f"Detalle del Formulario: {self.formulario.nombre}"


class TipoServicio(models.Model):

    nombre_servicio = models.CharField(max_length=50, unique=True, verbose_name="Nombre del servicio")
    formulario = models.OneToOneField(Formulario, on_delete=models.CASCADE, related_name="tipo_servicio", verbose_name="Formulario asociado")

    def __str__(self):
        return self.nombre_servicio
