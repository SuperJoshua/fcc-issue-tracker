"use strict"

// For those that come after me who may be reading this, if FCC still has these archived projects up, if you're inexplicably failing the FCC tests, check the order that you're checking for input. Mine fault was Test 9, where I was checking for a missing id before checking for missing update fields. To my mind, id checking should come first, but that wasn't the case for the tests.

const e = require("cors")

// a throwaway database
const db = {"apitest": {"issues":[{"assigned_to":"d","status_text":"e","open":true,"_id":"1","issue_title":"a","issue_text":"b","created_by":"c","created_on":"2025-05-19T19:11:19.277Z","updated_on":"2025-05-19T19:11:19.277Z"},{"assigned_to":"i","status_text":"j","open":true,"_id":"1","issue_title":"f","issue_text":"g","created_by":"h","created_on":"2025-05-19T20:36:16.385Z","updated_on":"2025-05-19T20:36:16.385Z"}], index: 2}}

module.exports = function(app) {
   app.route("/api/issues/:project")
   .get(function (req, res){
      const project = req.params.project

      if (!db[project]) {res.send([])}

      else {
         /*
         According to the live site example, I can apparently feed nonsense keys into the query, like "bubbles=1" and "potato=three", and those keys are simply ignored.

         Entering a query that contains an acceptable key with an acceptable value, will filter the results accordingly -- possibly returning an empty array.

         However, the query "open=maybe" (open expects a boolean), returns nothing -- not even an empty array. Was this intentional or simply an oversight?

         Whatever the case, in my implementation, "bob=3" and "open=usually" both return [].
         */
         const entries = Object.entries(req.query)
         if (entries.length > 0) {
            const result = db[project].issues.filter(issue => {
               let pass = true
               for (const [key, value] of entries) {
                  if (!(issue[key] === value)) {
                     pass = false
                     break
                  }
               }
               if (pass) {return issue}
            })

            res.send(result)
         }

         else {res.send(db[project].issues)}
      }
   })
   .post(function (req, res){
      const project = req.params.project
      const body = req.body

      if (body.created_by && body.issue_title && body.issue_text) {
         if (!db[project]) {db[project] = {"issues": [], "index": 0}}

         const assigned_to = (body.assigned_to) ? body.assigned_to : ""
         const status_text = (body.status_text) ? body.status_text : ""
         const open = true
         const _id = String(db[project].index)
         const issue_title = body.issue_title
         const issue_text = body.issue_text
         const created_by = body.created_by
         const created_on = new Date().toISOString()
         const updated_on = new Date().toISOString()

         db[project].issues[_id] = {assigned_to, status_text, open, _id, issue_title, issue_text, created_by, created_on, updated_on}

         db[project].index += 1

         res.send(db[project].issues[_id])
      }

      else {res.send({"error": "required field(s) missing"})}
   })
   .put(function (req, res){
      const project = req.params.project
      const body = req.body
      const _id = body._id

      if(!_id) {res.send({"error": "missing _id"})}

      else if (!(body.assigned_to || body.status_text || body.open || body.issue_title || body.issue_text || body.created_by)) {res.send({"error": "no update field(s) sent", _id})}

      else if (!db[project].issues[_id]) {res.send({"error": "could not update", _id})}

      else {
         if (!db[project].issues[_id].open) {res.send({"error": "could not update", _id})}

         else {
            db[project].issues[_id].assigned_to = (body.assigned_to) ? body.assigned_to : db[project].issues[_id].assigned_to
            db[project].issues[_id].status_text = (body.status_text) ? body.status_text : db[project].issues[_id].status_text
            // This checks if the "Check to close issue" checkbox is clicked.
            db[project].issues[_id].open = (body.open) ? false : true
            db[project].issues[_id].issue_title = (body.issue_title) ? body.issue_title : db[project].issues[_id].issue_title
            db[project].issues[_id].issue_text = (body.issue_text) ? body.issue_text : db[project].issues[_id].issue_text
            db[project].issues[_id].created_by = (body.created_by) ? body.created_by : db[project].issues[_id].created_by
            db[project].issues[_id].updated_on = new Date().toISOString()

            res.send({"result": "successfully updated", _id})
         }
      }
   })
   .delete(function (req, res){
      const project = req.params.project
      const _id = req.body._id

      if(!_id) {res.send({"error": "missing _id"})}

      else {
         if(!db[project].issues[_id]) {res.send({"error": "could not delete", _id})}

         else {
            db[project].issues[_id] = {"fate": "deleted"}
            res.send({"result": "successfully deleted", _id})
         }
      }
   })
}
