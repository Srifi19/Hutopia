const skillModel = require("../Models/skills");
const candidateFilling = require("../DataEntry/candidateFilling");
const Dictionary = require("../Helpers/Dictionary");



exports.addSkills = async (req,res) => {
    const userId = req.userId;
    const {skills} = req.body;
 
    const array = JSON.stringify(skills)

    await skillModel.addSkills(userId , array)
    .then(() => {
        res.status(200).json({message:"Well done" , success:true})
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({message:"Problem" , success:false})
    })
}


exports.getSkills = async (req, res) => {
  const userId = req.userId;
  const jsonToSend = [];

  try {
    const data = await skillModel.getSkills(userId);

    // Define a function to get the name for a given ID
    const getNameByIdValue = async (id) => {
      try {
        return await Dictionary.getNameByIdValue(id);
        
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    // Process the skills data
    await Promise.all(
      data.map(async (skillId) => {
        const skill = skillId.substring(0, 8);
        const level = skillId.substring(8);
        const [skillName, levelName] = await Promise.all([
          getNameByIdValue(skill),
          getNameByIdValue(level),
        ]);

        jsonToSend.push({
          SkillId: skill,
          LevelId: level,
          SkillName: skillName,
          LevelName: levelName,
        });
      })
    );

    res.status(200).json({ message: "Well done", success: true, data: jsonToSend });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Problem", success: false });
  }
};

exports.getAllSkills = async (req,res) => {

    await skillModel.getAllSkills()
        .then((data) => {
            res.status(200).json({message:"Well done" , success:true , data:data})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({message:"Problem" , success:false})
        })

}


/*
exports.random = async (req,res) => {
    try {
        console.log("Hello");
      const data = await candidateFilling.randomGeneration(req,res);
      res.status(200).json({ message: "Success", data, success: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Problem", success: false });
    }
  };
  */
