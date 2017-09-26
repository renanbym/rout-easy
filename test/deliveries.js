process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Deliveries ', () => {

    // beforeEach( (done) => {
    //     deliveryModel().remove({}, (error) => {
    //         done();
    //     });
    // });

    describe('/POST deliveries', (done) =>  {

        it('does not return the POST, because undefined fields', (done) => {

            let delivery = {
                name: 'Renan Mariano'
                ,address: {
                    street: 'Rua Araruna, 75'
                    , city: 'Guarulhos'
                    , country: 'Brazil'
                    , latitude: '-23.4572661'
                    , longitude: '-46.514908'
                }
            }

            chai.request(server)
            .post('/api/deliveries')
            .send(delivery)
            .end( (err, res) => {
                // res.should.have.status(401);
                // res.body.status.should.be.equal('error');
                // res.body.message.should.be.a('object');
                done();
            });

        });

        it('create delivery', (done) => {

            let delivery = {
                name: 'Renan Mariano'
                ,weight: '90'
                ,address: {
                    street: 'Rua Araruna, 75'
                    , city: 'Guarulhos'
                    , state: 'Guarulhos'
                    , country: 'Brazil'
                    , latitude: '-23.4572661'
                    , longitude: '-46.514908'
                }
            }

            chai.request(server)
            .post('/api/deliveries')
            .send(delivery)
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('weight');
                res.body.data.should.have.property('address');
                res.body.data.address.should.have.property('street');
                res.body.data.address.should.have.property('city');
                res.body.data.address.should.have.property('state');
                res.body.data.address.should.have.property('country');
                res.body.data.address.should.have.property('latitude');
                res.body.data.address.should.have.property('longitude');
                done()
            })
        })
    })


    describe('/GET deliveries', (done) =>  {

        it('return the deliveries', (done) => {
            chai.request(server)
            .get('/api/deliveries')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                done();
            });
        });

    });

    describe('/DELETE deliveries', (done) =>  {

        it('delete delivery id', (done) => {

            let data = {
                name: 'Renan Mariano'
                ,weight: '90'
                ,address: {
                    street: 'Rua Araruna, 75'
                    , city: 'Guarulhos'
                    , state: 'São Paulo'
                    , country: 'Brazil'
                    , latitude: '-23.4572661'
                    , longitude: '-46.514908'
                }
            }

            const deliveryModel =  mongoose.model('Delivery');
            let delivery = new deliveryModel(data);

            delivery.save( (err, delivery) => {
                chai.request(server)
                .delete('/api/deliveries' )
                .send({ _id: delivery._id })
                .end( (err, res) => {
                    // res.should.have.status(200);
                    res.body.status.should.be.equal('success');
                    // res.body.message.should.be.a('array');
                    done()
                })
            })

        })

    });

});
