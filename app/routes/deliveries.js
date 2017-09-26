module.exports = (app) => {

    const deliveries = app.controllers.deliveries

    app.route('/api/deliveries')
    .get( deliveries.get )
    .post( deliveries.save )
    .delete( deliveries.delete )

}
