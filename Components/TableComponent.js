export class TableComponent {
  data;
  elementId;
  isResizable = true;
  hasFloatingFilter = false;
  /**
   * Construtor da tabela .
   *
   * @param   data  json que será exibido na tabela.
   * @param   elementId  id da div que será utilizada como base para a tabela.
   * @param   isResizable se o tamanho das colunas ira se adequar para apenas preencher a tela.
   */
  constructor(data, elementId, isResizable) {
    this.data = data;
    this.elementId = elementId;
    if (isResizable != null) {
      this.isResizable = isResizable;
    }
  }
  gridOptions = {
    columnDefs: [],

    defaultColDef: {
      flex: 1,
      minWidth: 180,
      filter: true,
      floatingFilter: this.hasFloatingFilter,
      sortable: true,
      resizable: this.isResizable,
    },

    rowSelection: "single",
    animateRows: true,

    onCellClicked: (params) => {
      this.setOnCellClicked(params);
    },
    onGridReady: (params) => {
      if (this.isResizable) {
        this.setResizable(params);
      }
    },
  };
  /**
   * Define se esta tabela ira possuir um Floationg Filter  .
   *
   * @param   hasFloatingFilter  valor booleano, usado para setar o Floationg Filter.
   */
  setFloatingFilter(hasFloatingFilter) {
    const colDefs = this.gridOptions.defaultColDef;
    colDefs.floatingFilter = hasFloatingFilter;
    this.gridOptions.defaultColDef = colDefs;
  }
  /**
   * Define a altura da tabela .
   *
   * @param   size  valor que a altura ira assumir.
   */
  setResizable(params) {
    params.api.sizeColumnsToFit();

    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
        const menu = document.getElementById("menu-lateral")
        menu.style.height = "100%";
      });
    });
  }
  /**
   * Define o comportamento do click, para cliques personalizados deve ser alterado o valor  .
   *
   * @param   size  valor que a altura ira assumir.
   *
   */
  setOnCellClicked(params) {
    console.log("default cell clicked", params);
  }
  /**
   * Inicia a tabela, deve ser utilizado apenas apos aplicar todas as customizações .
   *
   */
  initTable() {
    const eGridDiv = document.getElementById(this.elementId);
    eGridDiv.innerHTML = "";
    // new grid instance, passing in the hosting DIV and Grid Options
    new agGrid.Grid(eGridDiv, this.gridOptions);
    this.addDataTable();
    const menu = document.getElementById("menu-lateral")
    menu.style.height = "100%";
  }
  /**
   * Define o conteudo da tabela .
   *
   */
  addDataTable() {
    const colDefs = this.gridOptions.api.getColumnDefs();
    colDefs.length = 0;
    const keys = Object.keys(this.data[0]);
    keys.forEach((key) => colDefs.push({ field: key }));
    this.gridOptions.api.setColumnDefs(colDefs);

    this.gridOptions.api.setRowData(this.data);
  }
  /**
   * deseleciona todas as linhas  .
   *
   */
  deselect() {
    this.gridOptions.api.deselectAll();
  }
  /**
   * Define a altura  e largura iguais da tabela .
   *
   * @param   size  valor que a altura ira assumir.
   */
  setWidthAndHeight(size) {
    var eGridDiv = document.getElementById(this.elementId);
    eGridDiv.style.setProperty("width", size);
    eGridDiv.style.setProperty("height", size);
  }
  /**
   * Define a largura da tabela .
   *
   * @param   size  valor que a largura ira assumir.
   */
  setWidth(size) {
    var eGridDiv = document.getElementById(this.elementId);
    eGridDiv.style.setProperty("width", size);
  }
  /**
   * Define a altura da tabela .
   *
   * @param   size  valor que a altura ira assumir.
   */
  setHeight(size) {
    var eGridDiv = document.getElementById(this.elementId);
    eGridDiv.style.setProperty("height", size);
  }

  /** 
   * Exemplo de como alterar a função de click padrão
   *  var table = new TableCompont(data, "myGrid2", false);
    var newClicked = table.setOnCellClicked();
    newClicked = function (str) {
     console.log("new cell clicked", str);
    };
    table.setOnCellClicked = newClicked;
   */
}
