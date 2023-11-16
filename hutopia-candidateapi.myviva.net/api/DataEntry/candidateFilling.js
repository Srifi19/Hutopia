const skillController = require("../Controllers/skillController");
const authController = require("../Controllers/authController");
const languageController = require("../Controllers/languageController");
const educationController = require("../Controllers/educationController");
const experienceController = require("../Controllers/experienceController");

exports.randomGeneration = (req,res) => {
    

const skills = [];
const level = [13710069 , 13710070 , 13710071 , 13710072 , 13710073];
const proficiency = [13710074 , 13710075 , 13710076 , 13710077 , 13710078]
let languages = [];

let start = 11810000;
let end = 11810590;

for (let i = start; i <= end; i++) {
    languages.push(i);
}

start = 13710009
end = 13710058

for (let i = start; i <= end; i++) {
    skills.push(i);
}



const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const getRandomSkills = () => {
    const numSkills = randomInRange(1, 5); // Generate 1 to 5 random skills per user
    const randomSkills = [];
  
    for (let i = 0; i < numSkills; i++) {
      randomSkills.push(skills[randomInRange(0, skills.length - 1)]);
    }
  
    return randomSkills;
  };
  
  const getRandomLanguages = () => {
    const numLanguages = randomInRange(1, 3); // Generate 1 to 3 random languages per user
    const randomLangs = [];
  
    for (let i = 0; i < numLanguages; i++) {
      randomLangs.push(languages[randomInRange(0, languages.length - 1)]);
    }
  
    return randomLangs;
  };
  
const defaultEmail = "sami";
  for (let i = 0; i < 10; i++) {
     
      req.body =  {
        email: defaultEmail + i,
        password: "Sami",
      },
    
  
    req.body.skills = getRandomSkills();
    req.body.languages = getRandomLanguages();
  
    authController.registerMainInfos(req, res);
    skillController.addSkills(req, res);
    languageController.addLanguage(req, res);
  }

}