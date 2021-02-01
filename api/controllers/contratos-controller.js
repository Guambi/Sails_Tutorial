module.exports = {


  friendlyName: 'Contratos controller',


  description: '',


  inputs: {
    fechaInicial: {
      type: 'string'
    },
    fechaFinal: {
      type: 'string'
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/homepage'
    },
  },


  fn: async function (inputs) {

    var inicio = inputs.fechaInicial;
    var final = inputs.fechaFinal;
    sails.log.info(final);
    var contratos = await Contrato.find().populate('cliente');
    var busqueda;
    if (inicio && final) {
      busqueda = await Contrato.find({
        fecha: { '>=': inicio, '<=': final }
      }).populate('cliente');

      let mapa = new Map();
      busqueda.forEach(element => {
        mapa.set(element.cliente.nombre, 0);
      });
      sails.log(mapa);

      busqueda.forEach(element => {
        cliente = element.cliente.nombre;
        monto = element.monto + mapa.get(cliente);
        mapa.set(cliente, monto);
      });
      busqueda = Array.from(mapa.entries());

      
      sails.log.info(busqueda);
    }

    // All done.
    return {
      contratos: contratos,
      busqueda: busqueda,
      inicio: inicio,
      final: final,
    };

  }


};
