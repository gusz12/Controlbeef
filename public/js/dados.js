function salvarFrigo(frigo, nomeFrigo) {
    var idFrigo = frigo;
    var nomeFrigo = nomeFrigo

    sessionStorage.setItem('NOME_FRIGO_ATUAL', nomeFrigo)
    sessionStorage.setItem('FRIGO_ATUAL', idFrigo);

    window.location = '/dashboard/frigorifico.html';
}



