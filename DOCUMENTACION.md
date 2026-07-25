# Geoportal Movilidad Urbana - GAD Parroquial de Nayón

## 1. Enlace Público del Geoportal

### Despliegue via GitHub Pages

Para activar el enlace público, habilitar **GitHub Pages** en el repositorio:

1. Ir a **Settings > Pages** del repositorio
2. En **Source**, seleccionar la rama `main` y carpeta `/ (root)`
3. Guardar cambios

**Enlace público:**
```
https://sebaswork99-blip.github.io/geoportal_movilidad_nayon/
```

### Requisitos del Navegador

| Navegador | Soporte |
|-----------|---------|
| Chrome    | Completo |
| Firefox   | Completo |
| Safari    | Completo |
| Edge      | Completo |

**Requisitos mínimos:**
- Navegador actualizado (2023 o posterior)
- Conexión a internet estable
- JavaScript habilitado
- Geolocalización habilitada (para reportes ciudadanos)

---

## 2. Descripción General

Aplicación web SIG (Sistema de Información Geográfica) para la visualización y gestión de datos de movilidad urbana de la Parroquia Nayón, cantón Quito, provincia de Pichincha.

### Arquitectura

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Mapa | Leaflet 1.9.4 |
| Base de datos | Supabase (PostgreSQL + PostGIS) |
| Fuentes | Google Fonts (Inter) |
| Capas base | OpenStreetMap, Esri Satélite, OpenTopoMap |

---

## 3. Pruebas de Funcionamiento

### 3.1 Prueba de Carga del Geoportal

| # | Acción | Resultado Esperado |
|---|--------|-------------------|
| 1 | Abrir la URL del geoportal | Se muestra la interfaz con mapa y barra lateral |
| 2 | Verificar carga del mapa centrado en Nayón | Mapa centrado en coordenadas -0.1393, -78.4486, zoom 14 |
| 3 | Verificar logo GAD Parroquial | Logo circular visible en la cabecera de la barra lateral |
| 4 | Verificar créditos | Texto "UTPL 2026 \| Especialización SIG - DG" visible en la parte inferior |

### 3.2 Prueba de Capas GIS

| # | Capa | Tabla Supabase | Verificación |
|---|------|----------------|--------------|
| 1 | Límites Administrativos | LIMITE_PARROQUIA_P | Polígono amarillo punteado, popup con parroquia, cantón, provincia |
| 2 | Barrios | BARRIOS_NAYON | Polígonos verdes, popup con nombre, parroquia, código, límites |
| 3 | Paradas de Bus | PARADA_BUSES_NAYON_P | Marcadores amarillos circulares, popup con vías principal/secundaria |
| 4 | Paradas Proyecto | PARADAS_BUSES_PROJECT_A | Marcadores naranjas circulares |
| 5 | Zona Influencia Paradas | BUFFER_PARADAS_NAYON | Polígono cyan transparente con dashArray |
| 6 | Rutas Intracantonales | RUTA_INTRACANTONAL_NAYON_P | Líneas verdes, popup con operador, código, distancia |
| 7 | Ciclovías | CICLOVIA_PROJECT | Líneas moradas, popup con tipología, estado, longitud |
| 8 | Estacionamientos | ESTACIONAMIENTOS_NAYON_P | Polígonos rojos, popup con nombre, capacidad, tarifa |
| 9 | Vías Urbanas | VIAS_NAYON_P | Líneas naranjas, popup con nombre, tipo, categoría |
| 10 | Reportes Ciudadanos | reportes_movilidad | Marcadores rosados, popup con tipo, fecha, estado |

**Procedimiento de prueba de capas:**
1. Presionar "Cargar Capas"
2. Verificar que el indicador de carga se muestra
3. Confirmar que todas las capas aparecen en el mapa
4. Verificar contadores de features en la barra lateral
5. Activar/desactivar cada capa individualmente con los checkboxes
6. Hacer clic en features para verificar popups con atributos

### 3.3 Prueba de Capas Base

| # | Capa Base | Proveedor | Verificación |
|---|-----------|-----------|--------------|
| 1 | OSM | OpenStreetMap | Mapa de calles predeterminado |
| 2 | Satélite | Esri | Imagen satelital de alta resolución |
| 3 | Topográfico | OpenTopoMap | Mapa topográfico con curvas de nivel |

**Procedimiento:**
1. Usar el selector de capas (esquina superior derecha)
2. Cambiar entre las 3 capas base
3. Verificar que el mapa se actualiza correctamente

### 3.4 Prueba del Sistema de Reportes Ciudadanos

#### 3.4.1 Apertura del Modal

| # | Acción | Resultado Esperado |
|---|--------|-------------------|
| 1 | Hacer clic en botón flotante "Reportar" | Se abre modal de reporte |
| 2 | Verificar sección de GPS | Botón "Obtener Ubicación" visible |
| 3 | Verificar tipos de reporte | 3 opciones: Llegada de Bus, Estado Parada, Estado Vía |
| 4 | Verificar formulario del reportero | Campos de nombre, rol, email, teléfono |

#### 3.4.2 Reporte de Llegada de Bus

| # | Campo | Tipo | Obligatorio |
|---|-------|------|-------------|
| 1 | Nombre de la Parada | Texto | Sí |
| 2 | Hora de Llegada | Time picker | Sí |
| 3 | Ruta Asociada | Texto | No |

#### 3.4.3 Reporte de Estado de Parada

| # | Campo | Tipo | Obligatorio |
|---|-------|------|-------------|
| 1 | Nombre de la Parada | Texto | Sí |
| 2 | Estado | Botones (Bueno/Regular/Malo) | Sí |
| 3 | Descripción | Textarea | No |

#### 3.4.4 Reporte de Estado de Vía

| # | Campo | Tipo | Obligatorio |
|---|-------|------|-------------|
| 1 | Nombre de la Vía | Texto | Sí |
| 2 | Estado | Botones (Bueno/Regular/Malo/Crítico) | Sí |
| 3 | Tipo de Problema | Select | No |
| 4 | Descripción | Textarea | No |

**Opciones de Tipo de Problema:**
- Hueco / Bache
- Inundación
- Derrumbe
- Falta de Señalización
- Falta de Iluminación
- Acera Dañada
- Otro

#### 3.4.5 Datos del Reportero

| # | Campo | Tipo | Obligatorio |
|---|-------|------|-------------|
| 1 | Nombre | Texto | Sí |
| 2 | Rol | Botones (Residente/Turista) | No |
| 3 | Email | Email | No |
| 4 | Teléfono | Teléfono | No |

#### 3.4.6 Envío del Reporte

| # | Prueba | Resultado Esperado |
|---|--------|-------------------|
| 1 | Obtener ubicación GPS | Se muestra coordenada y marcador rosa en el mapa |
| 2 | Seleccionar tipo de reporte | Se despliega el formulario correspondiente |
| 3 | Llenar campos obligatorios | Botón "Enviar Reporte" se activa |
| 4 | Enviar reporte | Se muestra modal de éxito |
| 5 | Verificar en mapa | El reporte aparece como marcador en la capa de reportes |
| 6 | Cerrar modal de éxito | Se cierra correctamente |

#### 3.4.7 Prueba de Errores

| # | Escenario | Resultado Esperado |
|---|-----------|-------------------|
| 1 | Sin GPS habilitado | Mensaje "GPS no disponible en este navegador" |
| 2 | Permiso GPS denegado | Mensaje "Permiso de ubicación denegado" |
| 3 | Sin tipo de reporte seleccionado | Botón enviar deshabilitado |
| 4 | Error de conexión Supabase | Modal de error con mensaje descriptivo |

### 3.5 Prueba del Dashboard de Reportes

| # | Funcionalidad | Resultado Esperado |
|---|---------------|-------------------|
| 1 | KPI Total | Muestra número total de reportes |
| 2 | KPI Hoy | Muestra reportes del día actual |
| 3 | Barras por tipo | Muestra distribución Bus/Parada/Vía |
| 4 | Estados | Muestra conteo Bueno/Regular/Malo/Crítico |
| 5 | Últimos reportes | Lista de los 8 reportes más recientes con tiempo relativo |
| 6 | Colapsar/Expandir | Header clickeable para toggle del dashboard |
| 7 | Botón actualizar | Recarga datos del dashboard |

### 3.6 Prueba de Diseño Responsivo

| # | Dispositivo | Verificación |
|---|-------------|--------------|
| 1 | Desktop (1920x1080) | Sidebar + mapa lado a lado |
| 2 | Tablet (768x1024) | Layout adaptado, mapa ocupa más espacio |
| 3 | Móvil (375x667) | Sidebar colapsable, mapa a pantalla completa |

---

## 4. Estructura de la Base de Datos Supabase

### Tablas Principales

| Tabla | Tipo Geometría | Descripción |
|-------|----------------|-------------|
| LIMITE_PARROQUIA_P | Polygon/MultiPolygon | Límites administrativos de la parroquia |
| BARRIOS_NAYON | Polygon/MultiPolygon | Barrios de Nayón |
| PARADA_BUSES_NAYON_P | Point | Paradas de buses existentes |
| PARADAS_BUSES_PROJECT_A | Point | Paradas de buses proyectadas |
| BUFFER_PARADAS_NAYON | Polygon | Zonas de influencia de paradas |
| RUTA_INTRACANTONAL_NAYON_P | LineString/MultiLineString | Rutas de transporte intracantonal |
| CICLOVIA_PROJECT | LineString/MultiLineString | Red de ciclovías |
| ESTACIONAMIENTOS_NAYON_P | Polygon/MultiPolygon | Estacionamientos |
| VIAS_NAYON_P | LineString/MultiLineString | Red vial urbana |
| reportes_movilidad | Point | Reportes ciudadanos de movilidad |

### Tabla reportes_movilidad - Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| tipo_reporte | text | Tipo: llegada_bus, estado_parada, estado_via |
| geom | geometry(Point, 4326) | Geometría del punto |
| latitud | double precision | Coordenada latitude |
| longitud | double precision | Coordenada longitude |
| nombre_parada | text | Nombre de la parada (llegada_bus) |
| hora_llegada | time | Hora de llegada del bus |
| ruta_asociada | text | Ruta del bus |
| nombre_parada_estado | text | Nombre de la parada evaluada |
| estado_parada | text | Estado: bueno, regular, malo |
| descripcion_parada | text | Descripción de la parada |
| nombre_via | text | Nombre de la vía evaluada |
| estado_via | text | Estado: bueno, regular, malo, critico |
| tipo_problema | text | Tipo de problema en la vía |
| descripcion_via | text | Descripción de la vía |
| nombre_reportero | text | Nombre del ciudadano reportero |
| rol_reportero | text | Residente o Turista |
| email_reportero | text | Email del reportero |
| telefono_reportero | text | Teléfono del reportero |
| fecha_reporte | timestamptz | Fecha y hora del reporte |

---

## 5. Coordenadas y Extensión Espacial

| Parámetro | Valor |
|-----------|-------|
| Centro del mapa | -0.1393, -78.4486 |
| Zoom inicial | 14 |
| Zoom máximo | 18 |
| Proyección | EPSG:4326 (WGS84) |
| Parroquia | Nayón |
| Cantón | Quito |
| Provincia | Pichincha |
| País | Ecuador |

---

## 6. Créditos

- **UTPL 2026 - Especialización SIG - DG**
- GAD Parroquial de Nayón
- Datos geoespaciales: Supabase/PostGIS
- Mapa: Leaflet + OpenStreetMap/Esri/OpenTopoMap
