module.exports = (app) => {

    const deliveryModel = app.models.delivery;

    const delivery = {
        get: (req, res) => {

            let query = deliveryModel.find({});
            query.exec( (err, deliveries) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": deliveries })
            });
        }

        ,save: (req, res) => {
            let query = new deliveryModel(req.body);
            query.save( (err, delivery) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": delivery })
            })
        }

        ,delete: (req, res) => {

            deliveryModel.remove({_id: req.body._id }, (err, delivery) => {
                let msg_error = null;
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors });
                if( delivery.result.n === 0 ) msg_error = "Campos inválidos";
                if( msg_error ) res.status(401).json({"code":401,"status":"error","message": msg_error });

                if(!msg_error && !err)  res.status(200).json({"code":200,"status":"success","data": delivery })
            })
        }

    }

    return delivery;
}
