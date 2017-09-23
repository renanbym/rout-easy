process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Delivery = require('../app/models/delivery');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Deliveries ', () => {

    beforeEach( (done) => {
        Delivery.remove({},  (error) => {
            done();
        });
    });

    describe('API', () =>  {

        it('/GET deliveries', (done) =>  {

            it('return the deliveries', (done) => {
                chai.request(server)
                .get('/api/deliveries')
                .end( (error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
            });

        });

        it('/POST deliveries', (done) =>  {
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
                .end( (error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('weight');
                    res.body.errors.paginas.should.have.property('kind').eql('required');
                    done();
                });

            })

            it('create delivery', (done) => {
                let delivery = {
                    name: 'Renan Mariano'
                    ,weight: '90kg'
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
                .end( (error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('delivery added with success');
                    res.body.livro.should.have.property('name');
                    res.body.livro.should.have.property('weight');
                    res.body.livro.should.have.property('address');
                    res.body.livro.should.have.property('address');
                    res.body.livro.should.have.property('address', 'street');
                    res.body.livro.should.have.property('address', 'city');
                    res.body.livro.should.have.property('address', 'country');
                    res.body.livro.should.have.property('address', 'latitude');
                    res.body.livro.should.have.property('address', 'longitude');
                    done()
                })
            })
        })


        it('/DELETE/:id deliveries', (done) =>  {

            it('delete delivery id', (done) => {
                let delivery = new Delivery({
                    name: 'Renan Mariano'
                    ,weight: '90kg'
                    ,address: {
                        street: 'Rua Araruna, 75'
                        , city: 'Guarulhos'
                        , country: 'Brazil'
                        , latitude: '-23.4572661'
                        , longitude: '-46.514908'
                    }
                })

                delivery.save( (err, delivery) => {
                    chai.request(server)
                    .delete('/api/deliveries'+delivery.id )
                    .end( (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('delivery deleted');
                        done()
                    })
                })

            })

        });

    });


});
