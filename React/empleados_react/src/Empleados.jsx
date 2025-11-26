import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/api/empleados/';

function Empleados() {
	const [empleados, setEmpleados] = useState([]);
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		puesto: '',
		salario: '',
		fecha_ingreso: '',
		activo: '',
		telefono: '',
		direccion: '',
		departamento: '',
		email: '',
	});
	const [editId, setEditId] = useState(null);

	// listar
	const getEmpleados = async () => {
		try {
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error('Error al obtener Empleado');
			const data = await res.json();
			console.log(data);
			setEmpleados(data);
		} catch (error) {
			console.error(error);
		}
	};

	// Registrar
	const crearEmpleado = async (e) => {
		e.preventDefault();
		try {
			const data = {
				...formData,
				activo: formData.activo === 'true',
			};
			const res = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('Error al crear Empleado');
			setFormData({
				nombre: '',
				apellido: '',
				puesto: '',
				salario: '',
				fecha_ingreso: '',
				activo: '',
				telefono: '',
				direccion: '',
				departamento: '',
				email: '',
			});
			getEmpleados();
		} catch (error) {
			console.error(error);
		}
	};

	// Modificar
	const actualizarEmpleado = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${API_URL}${editId}/`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (!res.ok) throw new Error('Error al actualizar Empleado');
			setEditId(null);
			setFormData({ nombre: '', edad: '', nacionalidad: '' });
			getEmpleados();
		} catch (error) {
			console.error(error);
		}
	};

	// Eliminar
	const eliminarEmpleado = async (id) => {
		if (!confirm('¿Seguro que deseas eliminar esta Empleado?')) return;
		try {
			const res = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Error al eliminar Empleado');
			getEmpleados();
		} catch (error) {
			console.error(error);
		}
	};

	// listar
	const editarEmpleado = (empleado) => {
		setEditId(empleado.id);
		setFormData({
			nombre: empleado.nombre,
			apellido: empleado.apellido,
			puesto: empleado.puesto,
			salario: empleado.salario,
			fecha_ingreso: empleado.fecha_ingreso,
			activo: empleado.activo,
			telefono: empleado.telefono,
			direccion: empleado.direccion,
			departamento: empleado.departamento,
			email: empleado.email,
		});
	};

	useEffect(() => {
		getEmpleados();
	}, []);

	return (
		<div className="container mt-4">
			<h2 className="mb-4 text-center">Gestión de Empleados</h2>

			<div className="card p-4 shadow-sm mb-4">
				<h5>{editId ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}</h5>
				<form onSubmit={editId ? actualizarEmpleado : crearEmpleado}>
					<div className="row g-3">
						<div className="col-md-4">
							<label className="form-label">Nombre</label>
							<input
								type="text"
								className="form-control"
								value={formData.nombre}
								onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
								required
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label">Apellido</label>
							<input
								type="text"
								className="form-control"
								value={formData.apellido}
								onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
								required
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label">Puesto</label>
							<select
								className="form-select"
								value={formData.puesto}
								onChange={(e) => setFormData({ ...formData, puesto: e.target.value })}
								required
							>
								<option value="">Selecciona una opción</option>
								<option value="Desarrollador">Desarrollador</option>
								<option value="Diseñador">Diseñador</option>
								<option value="Marketing">Marketing</option>
								<option value="Contador">Contador</option>
							</select>
						</div>

						<div className="col-md-4">
							<label className="form-label">Salario</label>
							<input
								type="number"
								className="form-control"
								value={formData.salario}
								onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
								required
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label">Fecha de Ingreso</label>
							<input
								type="date"
								className="form-control"
								value={formData.fecha_ingreso}
								onChange={(e) => setFormData({ ...formData, fecha_ingreso: e.target.value })}
								required
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label">Activo</label>
							<select
								className="form-select"
								value={formData.activo}
								onChange={(e) => setFormData({ ...formData, activo: e.target.value })}
								required
							>
								<option value="">Selecciona una opción</option>
								<option value="true">Sí</option>
								<option value="false">No</option>
							</select>
						</div>

						<div className="col-md-4">
							<label className="form-label">Teléfono</label>
							<input
								type="number"
								className="form-control"
								value={formData.telefono}
								onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
								required
							/>
						</div>
						<div className="col-md-4">
							<label className="form-label">Direccion</label>
							<input
								type="direccion"
								className="form-control"
								value={formData.direccion}
								onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
								required
							/>
						</div>

						<div className="col-md-4">
							<label className="form-label">Departamento</label>
							<select
								className="form-select"
								value={formData.departamento}
								onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
								required
							>
								<option value="">Selecciona una opción</option>
								<option value="Finanzas">Finanzas</option>
								<option value="Publicidad">Publicidad</option>
								<option value="Desarrollo">Desarrollo</option>
							</select>
						</div>

						<div className="col-md-4">
							<label className="form-label">Email</label>
							<input
								type="text"
								className="form-control"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								required
							/>
						</div>
					</div>

					<div className="mt-3 d-flex justify-content-end">
						{editId && (
							<button
								type="button"
								className="btn btn-secondary me-2"
								onClick={() => {
									setEditId(null);
									setFormData({
										nombre: '',
										apellido: '',
										puesto: '',
										salario: '',
										fecha_ingreso: '',
										activo: '',
										telefono: '',
										direccion: '',
										departamento: '',
										email: '',
									});
								}}
							>
								Cancelar
							</button>
						)}
						<button type="submit" className="btn btn-primary">
							{editId ? 'Actualizar' : 'Agregar'}
						</button>
					</div>
				</form>
			</div>

			<div className="card shadow-sm">
				<div className="card-body">
					<h5 className="card-title mb-3">Listado de Empleados</h5>
					<table className="table table-hover table-bordered align-middle">
						<thead className="table-light">
							<tr>
								<th>ID</th>
								<th>nombre</th>
								<th>apellido</th>
								<th>puesto</th>
								<th>salario</th>
								<th>fecha_ingreso</th>
								<th>activo</th>
								<th>telefono</th>
								<th>direccion</th>
								<th>departamento</th>
								<th>email</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{empleados.length > 0 ? (
								//cambiar la "p" por "Empleados"
								empleados.map((e) => (
									<tr key={e.id}>
										<td>{e.id}</td>
										<td>{e.nombre}</td>
										<td>{e.apellido}</td>
										<td>{e.puesto}</td>
										<td>{e.salario}</td>
										<td>{e.fecha_ingreso}</td>
										<td>{e.activo ? 'Si' : 'No'}</td>
										<td>{e.telefono}</td>
										<td>{e.direccion}</td>
										<td>{e.departamento}</td>
										<td>{e.email}</td>
										<td>
											<button className="btn btn-sm btn-warning me-2" onClick={() => editarEmpleado(e)}>
												Editar
											</button>
											<button className="btn btn-sm btn-danger" onClick={() => eliminarEmpleado(e.id)}>
												Eliminar
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="11" className="text-center text-muted">
										No hay empleados registrados.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Empleados;
