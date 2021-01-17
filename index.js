"use strict";

const express = require("express");
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

var allCandidates = [
  {
    id: "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
    name: "Jimmy Coder",
    skills: ["javascript", "es6", "nodejs", "express"],
  },
];

app.post("/candidates", function (req, res) {
  // ...
  if (req.body && req.body.id && req.body.name && req.body.skills) {
    allCandidates.push(req.body);
    return res.status(200).send("200 OK: Candidate added successfully");
  } else {
    res.status(404).send("no candidates are defined");
  }
});

app.get("/candidates/search", function (req, res) {
  // ...
  if (req.query.skills) {
    let maxSkillCandidate = null;

    allCandidates.map((itemCandidate) => {
      let maxSkills = 0;
      let filteredSkills = itemCandidate.skills.filter((itemSkills) => {
        return req.query.skills.indexOf(itemSkills) !== -1;
      });

      if (filteredSkills.length > maxSkills) {
        maxSkills = filteredSkills.length;
        maxSkillCandidate = itemCandidate;
      }
      return maxSkillCandidate;
    });

    if (maxSkillCandidate) {
      return res.status(200).json(maxSkillCandidate);
    } else {
      return res.status(404).send("no skilled candidates found");
    }
  } else {
    let filteredCandidates = allCandidates.filter(
      (itemCandidate) =>
        Array.isArray(itemCandidate.skills) && itemCandidate.skills.length
    );
    if (filteredCandidates.length > 1) {
      return res.status(200).json(filteredCandidates);
    } else {
      return res.status(404).send("no skilled candidates found");
    }
  }
});

app.listen(process.env.HTTP_PORT || 3000);
