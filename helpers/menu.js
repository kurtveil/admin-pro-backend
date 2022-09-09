 const getMenuFront = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Administrador',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Principal', url: 'grafica1'},
            {titulo: 'Menu', url: '/'},
            {titulo: 'Lista pedidos', url: 'lista-pedidos'},
            {titulo: 'Inventario', url: 'inventario'},
            {titulo: 'Historial de entregas', url: 'historial'},
            {titulo: 'Publica tu oferta', url: 'ofertas'},
          ]
        },
        {
          titulo: 'Tiendas',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            {titulo: 'Lista de tiendas', url: 'usuarios'},
            {titulo: 'usuarios', url: 'usuarios'},
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