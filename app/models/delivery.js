const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            name: { type: String, required: true }
            ,weight:  { type: SchemaTypes.Double, min: 0,  required: true }
            ,address: {
                 street: { type: String, default: ''}
                , city: {type: String, default: '' ,required: true}
                , state: {type: String, default: '' ,required: true}
                , country: {type: String, default: '' ,required: true}
                , latitude:  {type: SchemaTypes.Double, min: -180, max: 180,  required: true}
                , longitude: {type: SchemaTypes.Double, min: -180, max: 180,  required: true}
            }
        }
    );

    return mongoose.model('Delivery', schema);
}
