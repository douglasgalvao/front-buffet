export function createParceiroView(div) {
    const htmlString = `
<div class='row'>
    <div class='col-12'>
        <h1 class='rotulo pt-2'>Gestão de Parceiros</h1>
    </div>
</div>
<div class='row'>
    <div class='col-6'>
        <label for='basic-url' class='form-label rotulo'>Nome</label>
        <div class='input-group mb-3'>
    <input
      type='text'
      class='form-control'
      id='nome'
      aria-describedby='basic-addon3'
      placeholder='Parceiro de eventos'
      required
    />
  </div>
</div>
<div class='col-5'>
  <label for='basic-url' class='form-label rotulo'>Tipo</label>
  <div class='input-group mb-3'>
  <select class="form-select" aria-label="Default select example" id="tipo">
  <option selected value="">selecione um tipo...</option>
  <option value="floricultura">floricultura</option>
  <option value="decoração">decoração</option>
  <option value="som">som</option>
</select>
  </div>
</div>
<div class='col-1'>
  <label for='basic-url' class='form-label rotulo'>id</label>
  <div class='input-group mb-3'>
    <input
      type='text'
      class='form-control'
      id='idParceiro'
      readonly
      aria-describedby='basic-addon3'
    />
  </div>
</div>
</div>
<div class='row'>
<div class='col-4'>
  <label for='basic-url' class='form-label rotulo'>Email</label>
  <div class='input-group mb-3'>
    <input
      type='email'
      class='form-control'
      id='email'
      aria-describedby='basic-addon3'
      required
      placeholder='parceiro@gmail.com'
    />
  </div>
</div>
<div class='col-4'>
  <label for='basic-url' class='form-label rotulo'>CNPJ</label>
  <div class='input-group mb-3'>
    <input
      name='cnpj'
      minlength='12'
      class='form-control'
      maxlength='20'
      class='font-pop'
      id='cnpj'
      placeholder='00.000.000/0000-00'
      required
    />
  </div>
</div>
<div class='col-4'>
  <label for='' class='form-label rotulo'>Valor por pessoa</label>
  <div class='input-group mb-3'>
    <input
      type='number'
      class='form-control'
      id='valor'
      aria-describedby='basic-addon3'
      required
      value='1'
    />
    <span class='input-group-text'>$</span>
  </div>
</div>
</div>
<div class='row m-3 justify-content-center align-content-center text-center'>
<div class="btn-group btn-group-lg" role="group" aria-label="...">
<div class='col-4'>
  <button type='button' id='cadastro' class='btn '>Cadastrar</button>
</div>
<div class='col-4'>
  <button type='button' id='update' class='btn '>Atualizar</button>
</div>
<div class='col-4'>
  <button type='button' id='deletar' class='btn '>Excluir</button>
</div>
</div>
</div>

`;

    div.innerHTML = htmlString
}
