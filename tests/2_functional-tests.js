"use strict"

// a file that I edited

const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", function() {
   test("create an issue with every field", function(done) {
      chai.request(server)
      .post("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("create an issue with only required fields", function(done) {
      chai.request(server)
      .post("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("create an issue with missing required fields", function(done) {
      chai.request(server)
      .post("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("view issues on a project", function(done) {
      chai.request(server)
      .get("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("view issues on a project with one filter", function(done) {
      chai.request(server)
      .get("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("view issues on a project with multiple filters", function(done) {
      chai.request(server)
      .get("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("update one field on an issue", function(done) {
      chai.request(server)
      .put("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("update multiple fields on an issue", function(done) {
      chai.request(server)
      .put("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("update an issue with missing _id", function(done) {
      chai.request(server)
      .put("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("update an issue with no fields to update", function(done) {
      chai.request(server)
      .put("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("update an issue with an invalid _id", function(done) {
      chai.request(server)
      .put("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("delete an issue", function(done) {
      chai.request(server)
      .delete("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("delete an issue with an invalid _id", function(done) {
      chai.request(server)
      .delete("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
   test("delete an issue with missing _id", function(done) {
      chai.request(server)
      .delete("/api/issues/:project")
      .end(function(err, res) {
         assert.strictEqual(res.body.string, "xxx")
         done()
      })
   })
})
