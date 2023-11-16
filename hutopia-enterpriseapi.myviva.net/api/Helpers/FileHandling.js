const fs = require('fs');
const path = require('path');
const chownr = require('chownr');
// Initialize variables to store the file paths


exports.uploadPhoto = async(oldPathData , newPath , logo , id) => {

    // Specify the destination directory where you want to save the logo
    const random = Math.random();
    if (oldPathData) {
      const pathToDeleteLogo = path.join(__dirname, '..', '..', '..', 'hutopia-images.myviva.net', 'media', 'images', newPath , oldPathData)
      if (fs.existsSync(pathToDeleteLogo)) {
        fs.unlinkSync(pathToDeleteLogo); // Delete the file
        console.log(`File '${pathToDeleteLogo}' has been deleted.`);
      }
    }

    const lastDotIndex = logo.name.lastIndexOf('.');
    let result = null;
    if (lastDotIndex !== -1) {
      result = logo.name.substring(lastDotIndex);
      console.log(result); // This will print "example.file.name"
    } else {
      // If there are no dots in the string
      console.log(inputString);
    }


    const DestinationDir = path.join(__dirname, '..', '..', '..', 'hutopia-images.myviva.net', 'media', 'images', newPath);
    // Ensure the destination directory exists
    if (!fs.existsSync(DestinationDir)) {
      fs.mkdirSync(DestinationDir, { recursive: true });
    }

    if(result != null){
    // Construct the full path to the destination file for the logo
    const pathPicture = path.join(DestinationDir, newPath + "_"  + id + "_" + random + result);
      console.log("HERE");
    // Save the uploaded logo data to the destination file
    fs.writeFileSync(pathPicture, logo.data)
    chownr(DestinationDir, 33, 33, (err) => {
      if (err) {
        console.error('Error setting ownership:', err);
      } else {
        console.log('Ownership set to www-data.');

        // Set read-only permissions
        fs.chmodSync(pathPicture, '444');
        console.log('Permissions set to read-only (444) for the file:', pathPicture);
        
        
      }
    });
    return  pathPicture.split("images/")[1];
    }



 
}
    