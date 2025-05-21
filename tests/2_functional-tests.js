"use strict"

// a file that I edited

// For the most part, I feel like I'm writing these tests to match the output, in order to pass this project. This is the wrong way to go about something. This is exactly what certification (probably unintentionally) encourages. No wonder hiring managers ultimately don't care about certificates.

const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", function() {
   test("create an issue with every field", function(done) {
      chai.request(server)
      .post("/api/issues/apitest")
      .send({"assigned_to":"d","status_text":"e","issue_title":"a","issue_text":"b","created_by":"c"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.assigned_to, "d")
         assert.strictEqual(res.body.status_text, "e")
         assert.strictEqual(res.body.issue_title, "a")
         assert.strictEqual(res.body.issue_text, "b")
         assert.strictEqual(res.body.created_by, "c")
         done()
      })
   })
   test("create an issue with only required fields", function(done) {
      chai.request(server)
      .post("/api/issues/apitest")
      .send({"issue_title":"a","issue_text":"b","created_by":"c"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.issue_title, "a")
         assert.strictEqual(res.body.issue_text, "b")
         assert.strictEqual(res.body.created_by, "c")
         done()
      })
   })
   test("create an issue with missing required fields", function(done) {
      chai.request(server)
      .post("/api/issues/apitest")
      .send({"issue_title":"a"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.error, "required field(s) missing")
         done()
      })
   })
   test("view issues on a project", function(done) {
      chai.request(server)
      .get("/api/issues/apitest")
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.isArray(res.body)
         done()
      })
   })
   test("view issues on a project with one filter", function(done) {
      chai.request(server)
      .get("/api/issues/apitest?open=true")
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.isArray(res.body)
         if (res.body.length > 0) {
            for (const item in res.body) {
               assert.strictEqual(item.open, true)
            }
         }
         done()
      })
   })
   test("view issues on a project with multiple filters", function(done) {
      chai.request(server)
      .get("/api/issues/apitest?open=true&created_by=bob")
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.isArray(res.body)
         if (res.body.length > 0) {
            for (const item in res.body) {
               assert.strictEqual(item.open, true)
               assert.strictEqual(item.created_by, "bob")
            }
         }
         done()
      })
   })
   test("update one field on an issue", function(done) {
      chai.request(server)
      .put("/api/issues/apitest")
      .send({"_id": "0", "status_text": "thinking about it"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.result, "successfully updated")
         assert.strictEqual(res.body._id, "0")
         done()
      })
   })
   test("update multiple fields on an issue", function(done) {
      chai.request(server)
      .put("/api/issues/apitest")
      .send({"_id": "0", "open": true, "status_text": "fixed it"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.result, "successfully updated")
         assert.strictEqual(res.body._id, "0")
         done()
      })
   })
   test("update an issue with missing _id", function(done) {
      chai.request(server)
      .put("/api/issues/apitest")
      .send({"created_by": "bob"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.error, "missing _id")
         done()
      })
   })
   test("update an issue with no fields to update", function(done) {
      chai.request(server)
      .put("/api/issues/apitest")
      .send({ _id: '5f665eb46e296f6b9b6a504d' })
      .end(function(err, res) {
         assert.equal(res.status, 200)
         //assert.strictEqual(res.body.error, "no update field(s) sent")
         //assert.strictEqual(res.body._id, "0")
         assert.deepEqual(res.body, { error: 'no update field(s) sent', _id: '5f665eb46e296f6b9b6a504d' })
         done()
      })
   })
   test("update an issue with an invalid _id", function(done) {
      chai.request(server)
      .put("/api/issues/apitest")
      .send({ _id: '5f665eb46e296f6b9b6a504d', issue_text: 'New Issue Text' })
      .end(function(err, res) {
         assert.equal(res.status, 200)
         //assert.strictEqual(res.body.error, "could not update")
         //assert.strictEqual(res.body._id, "x")
         assert.deepEqual(res.body, { error: 'could not update', _id: '5f665eb46e296f6b9b6a504d' })
         done()
      })
   })
   test("delete an issue", function(done) {
      chai.request(server)
      .delete("/api/issues/apitest")
      .send({"_id": "0"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.result, "successfully deleted")
         assert.strictEqual(res.body._id, "0")
         done()
      })
   })
   test("delete an issue with an invalid _id", function(done) {
      chai.request(server)
      .delete("/api/issues/apitest")
      .send({"_id": "x"})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.error, "could not delete")
         assert.strictEqual(res.body._id, "x")
         done()
      })
   })
   test("delete an issue with missing _id", function(done) {
      chai.request(server)
      .delete("/api/issues/apitest")
      .send({})
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.strictEqual(res.body.error, "missing _id")
         done()
      })
   })
})
