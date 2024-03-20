function generarPlantilla() {
    navigator.clipboard.readText()
        .then(text => {
            const contenido = text.trim().split('\t');
            if (contenido.length !== 3) {
                alert("El contenido copiado no está en el formato esperado (deben ser tres columnas separadas por tabuladores).");
                return;
            }

            const fecha = new Date().toLocaleDateString();
            const partesFecha = fecha.split('/');
            const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
            const [cuenta, correo, contrasena] = contenido;
            const perfil = document.getElementById('perfil').value.trim();
            const plantilla = `*${cuenta}*\n\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fechaReorganizada}`;

            navigator.clipboard.writeText(plantilla)
                .then(() => alert("La plantilla ha sido generada y copiada al portapapeles."))
                .catch(err => console.error('Error al copiar al portapapeles:', err));
        })
        .catch(err => console.error('Error al leer el portapapeles:', err));
}
