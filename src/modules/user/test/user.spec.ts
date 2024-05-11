import mocha from "mocha"
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../..";

chai.use(chaiHttp);
const router = () => chai.request(app)

describe("General API", () => {
    it("Should return Welcome message on / route", (done)=>{
        router()
        .get('/')
        .end((error, response)=>{
            if(error) done(error);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status', true);
            expect(response.body).to.have.property('message', "It is working.");
            done()
        })
    })
})

describe("User test cases", ()=>{
    let token = "";

    it("Should register a user", (done)=>{
        router()
        .post('/api/user/add')
        .send({
            names: "test1",
            email: "test1@example.com",
            password: "testPassword"
        })
        .end((error, response)=>{
            expect(201);
            expect(response.body).be.an('object')
            expect(response.body).to.have.property('status', true);
            done(error);
        })
    })

    it("Should not register a user with invalid data", (done)=>{
        router()
        .post('/api/user/add')
        .end((error, response)=>{
            expect(400);
            expect(response.body).be.an('object')
            expect(response.body).to.have.property('status', false);
            done(error);
        })
    })

    it("Should not Login in a user with invalid data", (done)=>{
        router()
        .post('/api/user/login')
        .end((error, response)=>{
            expect(400);
            expect(response.body).be.an('object')
            expect(response.body).to.have.property('status', false);
            done(error)
        })
    })
    it("Should Logn in a user", (done)=>{
        router()
        .post('/api/user/login')
        .send({
            email: "test1@example.com",
            password: "testPassword"
        })
        .end((error, response)=>{
            expect(200);
            expect(response.body).be.an('object')
            expect(response.body).to.have.property('status', true);
            token = response.body.token;
            done(error)
        })
    })

    it("Should update logged in user", (done) =>{
        router()
        .patch('/api/user/update')
        .set("Authorization", `Bearer ${token}`)
        .send({
            names: "updatedUser"
        })
        .end((error, response)=>{
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status', true);
            done(error)
        })
    })

    it("Should update logged in user", (done) =>{
        router()
        .patch('/api/user/update')
        .set("Authorization", `Bearer ${token}`)
        .end((error, response)=>{
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status', false);
            done(error)
        })
    })

    it("Should not update non-logged in user", (done) =>{
        router()
        .patch('/api/user/update')
        .send({
            names: "updatedUser"
        })
        .end((error, response)=>{
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status', false);
            done(error)
        })
    })

    it("Should delete logged in user", (done) =>{
        router()
        .delete('/api/user/delete')
        .set("Authorization", `Bearer ${token}`)
        .end((error, response)=>{
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('status', true);
            done(error);
        })
    })

})