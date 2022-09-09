 const getMenuFront = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Administrador',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Lista pedidos', url: 'lista-pedidos'},
            {titulo: 'Publica tu oferta', url: 'ofertas'},
          ]
        },
        {
          titulo: 'Tiendas',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            {titulo: 'Lista de tiendas', url: 'lista-tiendas'},
          ]
        }
      ];

      if (role === 'ADMIN_ROLE') {
          menu[1].submenu.unshift({titulo: 'Usuarios', url: 'usuarios'})
      }

      return menu;
}

module.exports = {
    getMenuFront
}