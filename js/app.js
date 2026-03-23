$(document).ready(() => {
    const API_URL = "controllers/api.php";
    let selectedStudent = null;
    let mode = 'POST'; 

    const request = async (method, data = null) => {
        let url = API_URL;
        const options = { method };

        if (data) {
            if (method === 'POST') {
                options.body = new URLSearchParams(data);
            } else {
                url += '?' + new URLSearchParams(data).toString();
            }
        }

        try {
            const res = await fetch(url, options);
            return await res.json();
        } catch (e) {
            return "Error en la conexión";
        }
    };

    const loadStudents = async (cedula = null) => {
        const params = cedula ? { cedula } : null;
        const data = await request('GET', params);
        const tbody = $('#tbodyEstudiantes');
        tbody.empty();

        if (data && data.length > 0) {
            data.forEach(est => {
                const tr = $(`
                    <tr>
                        <td>${est.cedula}</td>
                        <td>${est.nombre}</td>
                        <td>${est.apellido}</td>
                        <td>${est.telefono || '-'}</td>
                        <td>${est.direccion || '-'}</td>
                        <td>
                            <a href="#studentModal" class="edit" data-toggle="modal" data-json='${JSON.stringify(est)}'>
                                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                            </a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-cedula="${est.cedula}">
                                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                `);
                tbody.append(tr);
            });
        } else {
            tbody.append('<tr><td colspan="6" class="text-center">No records found</td></tr>');
        }
        $('[data-toggle="tooltip"]').tooltip();
    };

    $('#btnBuscar').click(() => {
        const cedula = $('#txtBuscarCedula').val().trim();
        loadStudents(cedula !== "" ? cedula : null);
    });

    $('#txtBuscarCedula').on('keyup', (e) => {
        if (e.key === 'Enter') {
            $('#btnBuscar').click();
        }
    });

    $('#btnAbrirModalAdd').click(() => {
        mode = 'POST';
        $('#formEstudiante')[0].reset();
        $('#txtCedula').prop('readonly', false);
        $('#modalTitle').text('Add Student');
    });

    $(document).on('click', '.edit', function() {
        mode = 'PUT';
        const est = $(this).data('json');
        selectedStudent = est;
        
        $('#modalTitle').text('Edit Student');
        $('#txtCedula').val(est.cedula).prop('readonly', true);
        $('#txtNombre').val(est.nombre);
        $('#txtApellido').val(est.apellido);
        $('#txtTelefono').val(est.telefono);
        $('#txtDireccion').val(est.direccion);
    });

    $(document).on('click', '.delete', function() {
        selectedStudent = { cedula: $(this).data('cedula') };
    });

    $('#btnGuardar').click(async () => {
        const formData = new FormData($('#formEstudiante')[0]);
        const data = Object.fromEntries(formData.entries());

        const response = await request(mode, data);
        alert(response);
        $('#studentModal').modal('hide');
        loadStudents();
    });

    $('#btnConfirmarEliminar').click(async () => {
        const response = await request('DELETE', { txtCedula: selectedStudent.cedula });
        alert(response);
        $('#deleteEmployeeModal').modal('hide');
        loadStudents();
    });

    loadStudents();
});
