$(document).ready(() => {
    const Api = "controllers/api.php";
    let estudiante = null;
    let mode = 'POST';

    const request = async (method, data = null) => {
        let url = Api;
        const options = { method };

        if (data) {
            if (method == 'POST') {
                options.body = new URLSearchParams(data);
            } else {
                url += '?' + new URLSearchParams(data).toString();
            }

        }
        const res = await fetch(url, options);
        return await res.json();
    };

    const loadStudents = async () => {
        const data = await request('GET');
        const tbody = $('#tbodyEstudiantes');
        tbody.empty();

        if (data && data.length > 0) {
            data.forEach(est => {
                const tr = $(`				
                    <tr>
						<td>${est.cedula}</td>
						<td>${est.nombre}</td>
						<td>${est.apellido}</td>
						<td>${est.telefono}</td>
						<td>${est.direccion}</td>
                        <td>
							<a href="#EstudianteModal" class="edit" data-toggle="modal" data-json='${JSON.stringify(est)}'>
                            <i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>

							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-cedula="${est.cedula}">
                            <i class="material-icons" data-toggle="tooltip" title="Borrar">&#xE872;</i></a>
						</td>
					</tr>
                `);
                tbody.append(tr);
            });
        } 
    };

    $('#btnAbrirModalAdd').click(() => {
        mode = 'POST';
        $('#formEstudiante')[0].reset();
        $('#txtCedula').prop('readonly', false);
        $('#modalTitle').text('Añadir estudiante');
    });

    $(document).on('click', '.edit', function () {
        mode = 'PUT';
        const est = $(this).data('json');
        estudiante = est;

        $('#txtCedula').val(est.cedula).prop('readonly', true);
        $('#modalTitle').text('Editar Estudiante');
        $('#txtNombre').val(est.nombre);
        $('#txtApellido').val(est.apellido);
        $('#txtTelefono').val(est.telefono);
        $('#txtDireccion').val(est.direccion);
    });

    $(document).on('click', '.delete', function () {
        estudiante = { cedula: $(this).data('cedula') };
    });

    $('#btnGuardar').click(async () => {
        const formData = new FormData($('#formEstudiante')[0]);
        const data = Object.fromEntries(formData.entries());

        const res = await request(mode, data);
        alert(res);

        $('#studentModal').modal('hide');
        loadStudents();
    });

    $('#btnConfirmarEliminar').click(async () => {
        const res = await request('DELETE', { txtCedula: estudiante.cedula });
        alert(res);

        $('#deleteEmployeeModal').modal('hide');
        loadStudents();
    });

    loadStudents();

});