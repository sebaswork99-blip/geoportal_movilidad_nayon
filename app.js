const SUPABASE_URL = document.getElementById('supabase_url').value;
const SUPABASE_KEY = document.getElementById('supabase_key').value;

const map = L.map('map', {
    center: [-0.1393, -78.4486],
    zoom: 14,
    zoomControl: false
});

L.control.zoom({ position: 'topright' }).addTo(map);

const baseLayers = {
    "OSM": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }),
    "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
    }),
    "Topográfico": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap'
    })
};

baseLayers["OSM"].addTo(map);
L.control.layers(baseLayers, null, { position: 'topright' }).addTo(map);

const layerConfig = {
    limites: {
        name: "Límites Administrativos",
        icon: "📍",
        color: "#f59e0b",
        tables: [
            { 
                name: "LIMITE_PARROQUIA_P", label: "Límite Parroquia", geomCol: "geom",
                style: { color: "#f59e0b", weight: 3, fillOpacity: 0.08, dashArray: "8,6" },
                popupFields: [
                    { key: "dpa_despar", label: "Parroquia" },
                    { key: "dpa_descan", label: "Cantón" },
                    { key: "dpa_despro", label: "Provincia" },
                    { key: "dpa_anio", label: "Año" }
                ]
            }
        ]
    },
    barrios: {
        name: "Barrios",
        icon: "🏘️",
        color: "#22c55e",
        tables: [
            { 
                name: "BARRIOS_NAYON", label: "Barrios de Nayón", geomCol: "geom",
                style: { color: "#22c55e", weight: 2, fillOpacity: 0.15 },
                popupFields: [
                    { key: "nombre", label: "Barrio" },
                    { key: "parroquia", label: "Parroquia" },
                    { key: "codigo", label: "Código" },
                    { key: "norte", label: "Límite Norte" },
                    { key: "sur", label: "Límite Sur" },
                    { key: "este", label: "Límite Este" },
                    { key: "oeste", label: "Límite Oeste" }
                ]
            }
        ]
    },
    transporte: {
        name: "Transporte Público",
        icon: "🚌",
        color: "#f59e0b",
        tables: [
            { 
                name: "PARADA_BUSES_NAYON_P", label: "Paradas de Bus", geomCol: "geom", isPoint: true,
                style: { radius: 7, fillColor: "#f59e0b", color: "#fff", weight: 2, fillOpacity: 0.9 },
                popupFields: [
                    { key: "principal", label: "Vía Principal" },
                    { key: "secundaria", label: "Vía Secundaria" }
                ]
            },
            { 
                name: "PARADAS_BUSES_PROJECT_A", label: "Paradas Proyecto", geomCol: "geom", isPoint: true,
                style: { radius: 7, fillColor: "#fb923c", color: "#fff", weight: 2, fillOpacity: 0.9 },
                popupFields: [
                    { key: "principal", label: "Vía Principal" },
                    { key: "secundaria", label: "Vía Secundaria" }
                ]
            },
            { 
                name: "BUFFER_PARADAS_NAYON", label: "Zona Influencia Paradas", geomCol: "buffer_geom",
                style: { color: "#06b6d4", weight: 1, fillOpacity: 0.12, dashArray: "4,4" },
                popupFields: [
                    { key: "principal", label: "Vía Principal" }
                ]
            },
            { 
                name: "RUTA_INTRACANTONAL_NAYON_P", label: "Rutas Intracantonales", geomCol: "geom",
                style: { color: "#1a7a3a", weight: 4, fillOpacity: 0.8 },
                popupFields: [
                    { key: "nombre_ope", label: "Operador" },
                    { key: "cód__ruta", label: "Código Ruta" },
                    { key: "origen___d", label: "Origen - Destino" },
                    { key: "distancia", label: "Distancia (m)" },
                    { key: "diagnostic", label: "Diagnóstico" },
                    { key: "zonas_terr", label: "Zona Territorial" }
                ]
            }
        ]
    },
    ciclovias: {
        name: "Ciclovías",
        icon: "🚴",
        color: "#8b5cf6",
        tables: [
            { 
                name: "CICLOVIA_PROJECT", label: "Red de Ciclovías", geomCol: "geom",
                style: { color: "#8b5cf6", weight: 4, fillOpacity: 0.8 },
                popupFields: [
                    { key: "tipologia", label: "Tipología" },
                    { key: "tipo_ciclo", label: "Tipo Ciclovía" },
                    { key: "est_actual", label: "Estado Actual" },
                    { key: "clasific", label: "Clasificación" },
                    { key: "long_km", label: "Longitud (km)" },
                    { key: "zona", label: "Zona" },
                    { key: "ubicación", label: "Ubicación" },
                    { key: "sentido", label: "Sentido" },
                    { key: "vias", label: "Vías" }
                ]
            }
        ]
    },
    estacionamientos: {
        name: "Estacionamientos",
        icon: "🅿️",
        color: "#ef4444",
        tables: [
            { 
                name: "ESTACIONAMIENTOS_NAYON_P", label: "Estacionamientos", geomCol: "geom",
                style: { color: "#ef4444", weight: 2, fillOpacity: 0.35 },
                popupFields: [
                    { key: "name", label: "Nombre" },
                    { key: "amenity", label: "Tipo" },
                    { key: "capacity", label: "Capacidad" },
                    { key: "access", label: "Acceso" },
                    { key: "fee", label: "Tarifa" },
                    { key: "addr_stree", label: "Dirección" },
                    { key: "operator", label: "Operador" },
                    { key: "surface", label: "Superficie" },
                    { key: "opening_ho", label: "Horario" }
                ]
            }
        ]
    },
    vias: {
        name: "Vías Urbanas",
        icon: "🛣️",
        color: "#f97316",
        tables: [
            { 
                name: "VIAS_NAYON_P", label: "Red Vial Nayón", geomCol: "geom",
                style: { color: "#f97316", weight: 3, fillOpacity: 0.8 },
                popupFields: [
                    { key: "nam", label: "Nombre Vía" },
                    { key: "typ", label: "Tipo" },
                    { key: "catg_via", label: "Categoría" },
                    { key: "componente", label: "Componente" },
                    { key: "nam_tramo", label: "Tramo" },
                    { key: "shape_leng", label: "Longitud (m)" },
                    { key: "dpa_descan", label: "Cantón" }
                ]
            }
        ]
    },
    reportes: {
        name: "Reportes Ciudadanos",
        icon: "📋",
        color: "#ec4899",
        tables: [
            {
                name: "reportes_movilidad", label: "Reportes de Movilidad", geomCol: "geom", isPoint: true,
                style: { radius: 9, fillColor: "#ec4899", color: "#fff", weight: 2, fillOpacity: 0.9 },
                popupFields: [
                    { key: "tipo_reporte_label", label: "Tipo Reporte" },
                    { key: "fecha_formato", label: "Fecha" },
                    { key: "hora_llegada", label: "Hora Llegada" },
                    { key: "nombre_parada", label: "Parada" },
                    { key: "nombre_parada_estado", label: "Parada Evaluada" },
                    { key: "estado_parada_label", label: "Estado Parada" },
                    { key: "nombre_via", label: "Vía" },
                    { key: "estado_via_label", label: "Estado Vía" },
                    { key: "tipo_problema", label: "Problema" },
                    { key: "descripcion_parada", label: "Descripción Parada" },
                    { key: "descripcion_via", label: "Descripción Vía" },
                    { key: "nombre_reportero", label: "Reportero" },
                    { key: "rol_reportero", label: "Rol" }
                ]
            }
        ]
    }
};

let activeLayers = {};
let featureCounts = {};

function setStatus(msg, color = '#94a3b8') {
    const el = document.getElementById('status');
    el.style.color = color;
    el.innerHTML = msg;
}

function updateStats() {
    const layerCount = Object.keys(activeLayers).filter(k => activeLayers[k]).length;
    const featureCount = Object.values(featureCounts).reduce((a, b) => a + b, 0);
    document.getElementById('stat-layers').textContent = layerCount;
    document.getElementById('stat-features').textContent = featureCount;
}

function buildLayerUI() {
    const container = document.getElementById('layers-container');
    let html = '';

    for (const [groupKey, group] of Object.entries(layerConfig)) {
        html += `
            <div class="layer-group">
                <div class="layer-group-header" onclick="toggleGroup('${groupKey}')">
                    <div class="layer-group-icon" style="background: ${group.color}20; color: ${group.color};">
                        ${group.icon}
                    </div>
                    <div class="layer-group-info">
                        <h3>${group.name}</h3>
                        <p>${group.tables.length} capa(s)</p>
                    </div>
                    <div class="layer-group-toggle" id="toggle-${groupKey}">▼</div>
                </div>
                <div class="layer-group-layers" id="layers-${groupKey}">
                    ${group.tables.map((t, i) => `
                        <div class="layer-item">
                            <input type="checkbox" id="chk-${groupKey}-${i}" checked onchange="toggleLayer('${groupKey}', ${i})">
                            <div class="layer-item-color" style="background: ${group.color};"></div>
                            <span class="layer-item-name">${t.label}</span>
                            <span class="layer-item-count" id="count-${groupKey}-${i}">-</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function toggleGroup(groupKey) {
    const el = document.getElementById(`layers-${groupKey}`);
    const toggle = document.getElementById(`toggle-${groupKey}`);
    el.classList.toggle('show');
    toggle.textContent = el.classList.contains('show') ? '▲' : '▼';
}

async function fetchTable(tableName, geomCol) {
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?select=*&limit=5000`;
    const response = await fetch(url, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });

    if (!response.ok) throw new Error(`Error ${tableName}: ${response.statusText}`);
    return await response.json();
}

function createGeoJSONLayer(data, config, groupKey, index) {
    const features = [];

    data.forEach(row => {
        let geom = row[config.geomCol];
        if (typeof geom === 'string') {
            try { geom = JSON.parse(geom); } catch (e) { return; }
        }

        if (geom && geom.type) {
            features.push({
                type: 'Feature',
                properties: row,
                geometry: geom
            });
        }
    });

    if (features.length === 0) return null;

    featureCounts[`${groupKey}-${index}`] = features.length;
    document.getElementById(`count-${groupKey}-${index}`).textContent = features.length;

    const geojsonLayer = L.geoJSON({ type: 'FeatureCollection', features }, {
        style: config.style,
        pointToLayer: config.isPoint ? (feature, latlng) => {
            return L.circleMarker(latlng, config.style);
        } : undefined,
        onEachFeature: (feature, layer) => {
            const layerColor = layerConfig[groupKey].color;
            const title = config.label;
            const fields = config.popupFields || [];

            let popup = `<div style="font-family: 'Inter', sans-serif; min-width: 240px; max-width: 320px;">`;
            popup += `<div style="background: linear-gradient(135deg, ${layerColor}, ${layerColor}dd); padding: 12px 15px; border-radius: 8px 8px 0 0;">`;
            popup += `<div style="display: flex; align-items: center; gap: 8px;">`;
            popup += `<div style="width: 8px; height: 8px; border-radius: 50%; background: white;"></div>`;
            popup += `<span style="color: white; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">${title}</span>`;
            popup += `</div></div>`;
            popup += `<div style="background: white; padding: 12px 15px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">`;

            let hasData = false;
            for (const field of fields) {
                const value = feature.properties[field.key];
                if (value !== null && value !== undefined && value !== '') {
                    hasData = true;
                    popup += `<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #f0f0f0;">`;
                    popup += `<span style="font-size: 0.75rem; color: #6b7280; font-weight: 500;">${field.label}</span>`;
                    popup += `<span style="font-size: 0.8rem; color: #1f2937; font-weight: 600; text-align: right; max-width: 60%;">${value}</span>`;
                    popup += `</div>`;
                }
            }

            if (!hasData) {
                popup += `<div style="text-align: center; padding: 10px; color: #9ca3af; font-size: 0.8rem;">Sin atributos disponibles</div>`;
            }

            popup += `</div></div>`;
            layer.bindPopup(popup, { maxWidth: 350, closeButton: true });
        }
    });

    return geojsonLayer;
}

async function toggleLayer(groupKey, index) {
    const checkbox = document.getElementById(`chk-${groupKey}-${index}`);
    const layerKey = `${groupKey}-${index}`;

    if (checkbox.checked) {
        if (!activeLayers[layerKey]) {
            const config = layerConfig[groupKey].tables[index];
            try {
                setStatus(`Cargando ${config.label}...`, '#f59e0b');
                const data = await fetchTable(config.name, config.geomCol);
                const layer = createGeoJSONLayer(data, config, groupKey, index);
                if (layer) {
                    layer.addTo(map);
                    activeLayers[layerKey] = layer;
                }
            } catch (err) {
                setStatus(`Error: ${err.message}`, '#ef4444');
            }
        }
    } else {
        if (activeLayers[layerKey]) {
            map.removeLayer(activeLayers[layerKey]);
            delete activeLayers[layerKey];
            featureCounts[layerKey] = 0;
            document.getElementById(`count-${groupKey}-${index}`).textContent = '-';
        }
    }

    updateStats();
}

async function cargarTodasCapas() {
    document.getElementById('loading').classList.add('show');
    setStatus('Iniciando carga de capas...', '#3b82f6');

    let totalFeatures = 0;
    let loadedLayers = 0;

    for (const [groupKey, group] of Object.entries(layerConfig)) {
        for (let i = 0; i < group.tables.length; i++) {
            const config = group.tables[i];
            const layerKey = `${groupKey}-${i}`;

            try {
                setStatus(`Cargando ${config.label}...`, '#f59e0b');
                const data = await fetchTable(config.name, config.geomCol);
                const layer = createGeoJSONLayer(data, config, groupKey, i);

                if (layer) {
                    layer.addTo(map);
                    activeLayers[layerKey] = layer;
                    loadedLayers++;
                    totalFeatures += featureCounts[layerKey] || 0;
                }
            } catch (err) {
                console.error(`Error cargando ${config.name}:`, err);
            }
        }
    }

    document.getElementById('loading').classList.remove('show');
    setStatus(`✅ ${loadedLayers} capas cargadas | ${totalFeatures} features`, '#10b981');
    updateStats();
    cargarDashboard();
}

buildLayerUI();


// =============================================
// SISTEMA DE REPORTES DE MOVILIDAD
// =============================================

let tipoReporteSeleccionado = null;
let reportLat = null;
let reportLng = null;
let reportMarker = null;
let reportRol = null;

function abrirModalReporte() {
    document.getElementById('modal-reporte').classList.add('show');
}

function cerrarModalReporte() {
    document.getElementById('modal-reporte').classList.remove('show');
    resetFormularioReporte();
}

function cerrarModalExito() {
    document.getElementById('modal-exito').style.display = 'none';
}

function cerrarModalError() {
    document.getElementById('modal-error').style.display = 'none';
}

function resetFormularioReporte() {
    tipoReporteSeleccionado = null;
    reportLat = null;
    reportLng = null;
    reportRol = null;

    document.querySelectorAll('.tipo-reporte-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.form-dynamic').forEach(f => f.style.display = 'none');
    document.querySelectorAll('.estado-btn').forEach(b => b.classList.remove('selected'));

    document.getElementById('rep_nombre_parada').value = '';
    document.getElementById('rep_hora_llegada').value = '';
    document.getElementById('rep_ruta').value = '';
    document.getElementById('rep_nombre_parada_estado').value = '';
    document.getElementById('rep_estado_parada').value = '';
    document.getElementById('rep_desc_parada').value = '';
    document.getElementById('rep_nombre_via').value = '';
    document.getElementById('rep_estado_via').value = '';
    document.getElementById('rep_tipo_problema').value = '';
    document.getElementById('rep_desc_via').value = '';
    document.getElementById('rep_nombre').value = '';
    document.getElementById('rep_email').value = '';
    document.getElementById('rep_telefono').value = '';
    document.getElementById('rep_rol').value = '';

    document.getElementById('rol-residente').classList.remove('selected');
    document.getElementById('rol-turista').classList.remove('selected');

    const gpsDot = document.getElementById('gps-dot');
    gpsDot.classList.remove('active', 'loading');
    document.getElementById('gps-text').textContent = 'Presiona "Obtener Ubicación"';
    document.getElementById('report-lat').value = '';
    document.getElementById('report-lng').value = '';

    updateEnviarBtn();
}

function seleccionarTipo(tipo) {
    tipoReporteSeleccionado = tipo;

    document.querySelectorAll('.tipo-reporte-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`tipo-${tipo}`).classList.add('selected');

    document.querySelectorAll('.form-dynamic').forEach(f => f.style.display = 'none');
    const formEl = document.getElementById(`form-${tipo}`);
    if (formEl) formEl.style.display = 'block';

    updateEnviarBtn();
}

function seleccionarEstado(contexto, estado) {
    const hiddenInput = contexto === 'parada' ? document.getElementById('rep_estado_parada') : document.getElementById('rep_estado_via');
    hiddenInput.value = estado;

    const container = hiddenInput.closest('.form-section');
    container.querySelectorAll('.estado-btn').forEach(b => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    updateEnviarBtn();
}

function obtenerUbicacion() {
    const gpsDot = document.getElementById('gps-dot');
    const gpsText = document.getElementById('gps-text');

    if (!navigator.geolocation) {
        gpsText.textContent = 'GPS no disponible en este navegador';
        return;
    }

    gpsDot.classList.add('loading');
    gpsDot.classList.remove('active');
    gpsText.textContent = 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            reportLat = position.coords.latitude;
            reportLng = position.coords.longitude;

            document.getElementById('report-lat').value = reportLat;
            document.getElementById('report-lng').value = reportLng;

            gpsDot.classList.remove('loading');
            gpsDot.classList.add('active');
            gpsText.textContent = `📍 ${reportLat.toFixed(6)}, ${reportLng.toFixed(6)}`;

            if (reportMarker) map.removeLayer(reportMarker);
            reportMarker = L.marker([reportLat, reportLng], {
                icon: L.divIcon({
                    className: 'report-marker',
                    html: '<div style="width:20px;height:20px;background:#ec4899;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                })
            }).addTo(map);

            map.setView([reportLat, reportLng], 16);
            updateEnviarBtn();
        },
        (error) => {
            gpsDot.classList.remove('loading');
            let msg = 'Error al obtener ubicación';
            if (error.code === 1) msg = 'Permiso de ubicación denegado';
            if (error.code === 2) msg = 'Ubicación no disponible';
            if (error.code === 3) msg = 'Tiempo de espera agotado';
            gpsText.textContent = `⚠ ${msg}`;
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}

function updateEnviarBtn() {
    const btn = document.getElementById('btn-enviar');
    const ubicacionOk = reportLat !== null && reportLng !== null;
    const tipoOk = tipoReporteSeleccionado !== null;
    btn.disabled = !(ubicacionOk && tipoOk);
}

function seleccionarRol(rol) {
    reportRol = rol;
    document.getElementById('rep_rol').value = rol;
    document.getElementById('rol-residente').classList.toggle('selected', rol === 'Residente');
    document.getElementById('rol-turista').classList.toggle('selected', rol === 'Turista');
}

async function enviarReporte() {
    const btn = document.getElementById('btn-enviar');
    btn.disabled = true;
    btn.innerHTML = '⏳ Enviando...';

    const payload = {
        tipo_reporte: tipoReporteSeleccionado,
        geom: `SRID=4326;POINT(${reportLng} ${reportLat})`,
        latitud: reportLat,
        longitud: reportLng
    };

    if (tipoReporteSeleccionado === 'llegada_bus') {
        payload.nombre_parada = document.getElementById('rep_nombre_parada').value || null;
        payload.hora_llegada = document.getElementById('rep_hora_llegada').value || null;
        payload.ruta_asociada = document.getElementById('rep_ruta').value || null;
    }

    if (tipoReporteSeleccionado === 'estado_parada') {
        payload.nombre_parada_estado = document.getElementById('rep_nombre_parada_estado').value || null;
        payload.estado_parada = document.getElementById('rep_estado_parada').value || null;
        payload.descripcion_parada = document.getElementById('rep_desc_parada').value || null;
    }

    if (tipoReporteSeleccionado === 'estado_via') {
        payload.nombre_via = document.getElementById('rep_nombre_via').value || null;
        payload.estado_via = document.getElementById('rep_estado_via').value || null;
        payload.tipo_problema = document.getElementById('rep_tipo_problema').value || null;
        payload.descripcion_via = document.getElementById('rep_desc_via').value || null;
    }

    payload.nombre_reportero = document.getElementById('rep_nombre').value || null;
    payload.rol_reportero = reportRol || null;
    payload.email_reportero = document.getElementById('rep_email').value || null;
    payload.telefono_reportero = document.getElementById('rep_telefono').value || null;

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/reportes_movilidad`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText);
        }

        cerrarModalReporte();
        document.getElementById('modal-exito').style.display = 'flex';

        setTimeout(() => {
            cargarCapaReportes();
            cargarDashboard();
        }, 500);

    } catch (err) {
        console.error('Error enviando reporte:', err);
        document.getElementById('error-text').textContent = err.message || 'Error al enviar. Intenta nuevamente.';
        document.getElementById('modal-error').style.display = 'flex';
    }

    btn.disabled = false;
    btn.innerHTML = '📨 Enviar Reporte';
}

async function cargarCapaReportes() {
    const layerKey = 'reportes-0';
    if (activeLayers[layerKey]) {
        map.removeLayer(activeLayers[layerKey]);
        delete activeLayers[layerKey];
    }

    try {
        const config = layerConfig.reportes.tables[0];
        const data = await fetchTable('reportes_movilidad', 'geom');

        const enriched = data.map(row => {
            const tipoLabels = {
                'llegada_bus': '🚌 Llegada de Bus',
                'estado_parada': '🚏 Estado de Parada',
                'estado_via': '🛣️ Estado de Vía'
            };
            const estadoLabels = {
                'bueno': '✅ Bueno',
                'regular': '⚠️ Regular',
                'malo': '❌ Malo',
                'critico': '🔴 Crítico'
            };
            return {
                ...row,
                tipo_reporte_label: tipoLabels[row.tipo_reporte] || row.tipo_reporte,
                estado_parada_label: estadoLabels[row.estado_parada] || row.estado_parada,
                estado_via_label: estadoLabels[row.estado_via] || row.estado_via,
                fecha_formato: row.fecha_reporte ? new Date(row.fecha_reporte).toLocaleString('es-EC') : null
            };
        });

        const layer = createGeoJSONLayer(enriched, config, 'reportes', 0);
        if (layer) {
            layer.addTo(map);
            activeLayers[layerKey] = layer;
        }

        updateStats();
    } catch (err) {
        console.error('Error cargando reportes:', err);
    }
}


// =============================================
// DASHBOARD DE REPORTES
// =============================================

let dashboardOpen = true;

function toggleDashboard() {
    dashboardOpen = !dashboardOpen;
    const body = document.getElementById('dashboard-body');
    const toggle = document.getElementById('dash-toggle');
    
    if (dashboardOpen) {
        body.classList.remove('collapsed');
        toggle.textContent = '▼';
    } else {
        body.classList.add('collapsed');
        toggle.textContent = '▲';
    }
}

async function cargarDashboard() {
    try {
        const data = await fetchTable('reportes_movilidad', 'geom');
        if (!data || data.length === 0) return;

        const total = data.length;
        const today = new Date().toISOString().split('T')[0];
        const hoy = data.filter(r => r.fecha_reporte && r.fecha_reporte.startsWith(today)).length;

        document.getElementById('dash-total').textContent = total;
        document.getElementById('dash-hoy').textContent = hoy;

        const bus = data.filter(r => r.tipo_reporte === 'llegada_bus').length;
        const parada = data.filter(r => r.tipo_reporte === 'estado_parada').length;
        const via = data.filter(r => r.tipo_reporte === 'estado_via').length;
        const maxTipo = Math.max(bus, parada, via, 1);

        document.getElementById('val-bus').textContent = bus;
        document.getElementById('val-parada').textContent = parada;
        document.getElementById('val-via').textContent = via;
        document.getElementById('bar-bus').style.width = `${(bus / maxTipo) * 100}%`;
        document.getElementById('bar-parada').style.width = `${(parada / maxTipo) * 100}%`;
        document.getElementById('bar-via').style.width = `${(via / maxTipo) * 100}%`;

        let bueno = 0, regular = 0, malo = 0, critico = 0;
        data.forEach(r => {
            if (r.estado_parada === 'bueno' || r.estado_via === 'bueno') bueno++;
            if (r.estado_parada === 'regular' || r.estado_via === 'regular') regular++;
            if (r.estado_parada === 'malo' || r.estado_via === 'malo') malo++;
            if (r.estado_via === 'critico') critico++;
        });

        document.getElementById('val-bueno').textContent = bueno;
        document.getElementById('val-regular').textContent = regular;
        document.getElementById('val-malo').textContent = malo;
        document.getElementById('val-critico').textContent = critico;

        const sorted = [...data].sort((a, b) => new Date(b.fecha_reporte) - new Date(a.fecha_reporte));
        const recent = sorted.slice(0, 8);
        const container = document.getElementById('dash-recent');

        if (recent.length === 0) {
            container.innerHTML = '<div class="dash-recent-empty">Sin reportes aún</div>';
        } else {
            const tipoIcons = { llegada_bus: '🚌', estado_parada: '🚏', estado_via: '🛣️' };
            const tipoNames = { llegada_bus: 'Llegada Bus', estado_parada: 'Estado Parada', estado_via: 'Estado Vía' };

            container.innerHTML = recent.map(r => {
                const icon = tipoIcons[r.tipo_reporte] || '📋';
                const name = r.nombre_parada || r.nombre_parada_estado || r.nombre_via || tipoNames[r.tipo_reporte] || 'Reporte';
                const estado = r.estado_parada || r.estado_via;
                const fecha = r.fecha_reporte ? timeAgo(new Date(r.fecha_reporte)) : '';

                return `<div class="dash-recent-item">
                    <div class="dash-recent-icon">${icon}</div>
                    <div class="dash-recent-info">
                        <div class="dash-recent-name">${name}</div>
                        <div class="dash-recent-time">${fecha}</div>
                    </div>
                    ${estado ? `<div class="dash-recent-estado ${estado}">${estado}</div>` : ''}
                </div>`;
            }).join('');
        }

        const pulse = document.getElementById('dash-pulse');
        pulse.style.background = '#10b981';
    } catch (err) {
        console.error('Error cargando dashboard:', err);
    }
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Hace unos segundos';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-EC');
}
