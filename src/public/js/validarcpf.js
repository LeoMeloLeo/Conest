document.getElementById('inputCpfClient').addEventListener('input', function() {
    var cpf = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    var cpfHelp = document.getElementById('cpfHelp');
    var btnCreate = document.getElementById('btnCreate');
    var inputCpf = document.getElementById('inputCpfClient'); // Campo de CPF

    if (validarCPF(cpf)) {
        cpfHelp.style.color = 'green';
        cpfHelp.textContent = 'CPF válido';
        btnCreate.disabled = false; // Habilita o botão "Adicionar"
        inputCpf.classList.remove('cpf-invalido'); // Remove contorno vermelho
        inputCpf.classList.add('cpf-valido'); // Adiciona contorno verde
    } else {
        cpfHelp.style.color = 'red';
        cpfHelp.textContent = 'CPF inválido';
        btnCreate.disabled = true; // Desabilita o botão "Adicionar"
        inputCpf.classList.remove('cpf-valido'); // Remove contorno verde
        inputCpf.classList.add('cpf-invalido'); // Adiciona contorno vermelho
    }
});

function validarCPF(cpf) {
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    var digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;

    return true;
}