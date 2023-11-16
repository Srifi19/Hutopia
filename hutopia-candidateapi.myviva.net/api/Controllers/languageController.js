const languageModel = require("../Models/language");
const Dictionary = require("../Helpers/Dictionary")


exports.addLanguage = async (req,res) => {
    const userId = req.userId;
    const {language} = req.body;
    const array = JSON.stringify(language)
  
    await languageModel.addLanguage(userId , array)
    .then(() => {
        res.status(200).json({message:"Well done" , success:true})
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({message:"Problem" , success:false})
    })
}


exports.getLanguages = async (req, res) => {
    const userId = req.userId;
    const jsonToSend = [];
  
    try {
      const data = await languageModel.getLanguages(userId);
    
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
        data.map(async (languageId) => {
          const languages = languageId.substring(0, 8);
          const proficiency = languageId.substring(8);
          const [languageName, proficiencyName] = await Promise.all([
            getNameByIdValue(languages),
            getNameByIdValue(proficiency),
          ]);
  
          jsonToSend.push({
            languageId: languages,
            proficiencyId: proficiency,
            languageName: languageName,
            proficiencyName: proficiencyName,
          });
        })
      );
  
      res.status(200).json({ message: "Well done", success: true, data: jsonToSend });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Problem", success: false });
    }
  };


exports.getAllLanguages = async(req,res) => {

    await languageModel.getAllLanguages()
        .then((data) => {
            res.status(200).json({message:"Well done" , success:true, data:data})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({message:"Problem" , success:false})
        })
}

exports.getAllProficiency = async(req,res) => {
    await languageModel.getAllProficiency()
        .then((data) => {
            res.status(200).json({message:"Well done" , success:true, data:data})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({message:"Problem" , success:false})
        })
}