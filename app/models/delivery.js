const mongoose = require('mongoose');

module.exports = () => {

    const schema = mongoose.Schema(
        {
            name: { type: String, required: true }
            ,weight:  { type: Number, min: 0,  required: true }
            ,address: {
                 street: { type: String, default: ''}
                , city: {type: String, default: '' ,required: true}
                , state: {type: String, default: '' ,required: true}
                , country: {type: String, default: '' ,required: true}
                , latitude:  {type: Number, min: -180, max: 180,  required: true}
                , longitude: {type: Number, min: -180, max: 180,  required: true}
            }
        }
    );

    return mongoose.model('Delivery', schema);
}
