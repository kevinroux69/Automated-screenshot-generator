const fetch = require('node-fetch');
const { google } = require('googleapis');
const fs = require('fs');

// Set your Screenshot Machine API Key and Google Drive folder ID
const API_KEY = 'c31cc9'; // Your screenshot API key
const DRIVE_FOLDER_ID = '1nUpoZLCAziuJ2o4FEdT8Qgx1ISkOnWsw'; // Your Google Drive folder ID
const IMAGE_FORMAT = 'jpg';
const DIMENSION = '1920x1080';

// Define the webpages to capture
const webpages = [
  { id: 1, name: 'iFunded', url: 'https://ifunded.de/en/' },
  { id: 2, name: 'Property Partner', url: 'https://www.propertypartner.co' },
  { id: 3, name: 'Property Moose', url: 'https://propertymoose.co.uk' },
  { id: 4, name: 'Homegrown', url: 'https://www.homegrown.co.uk' },
  { id: 5, name: 'Realty Mogul', url: 'https://www.realtymogul.com' },
];

console.log('loading.....');

// Authenticate with the Google Drive API using your service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: 'screenshot-storage-402007-9e0dc7d6b54c.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

console.log("login ok");

const drive = google.drive({ version: 'v3', auth });

// Function to capture and download screenshots
async function downloadScreenshot(page) {
    const filename = `${page.id}_${page.name}.${IMAGE_FORMAT}`;
    const response = await fetch(`https://api.screenshotmachine.com/?key=${API_KEY}&url=${page.url}&dimension=${DIMENSION}&format=${IMAGE_FORMAT}`);
    
    if (response.ok) {
      const fileStream = fs.createWriteStream(filename);
      response.body.pipe(fileStream);
      return new Promise((resolve, reject) => {
        fileStream.on('finish', () => {
          console.log(`Downloaded: ${filename}`);
          resolve(filename);
        });
        fileStream.on('error', (error) => {
          console.error(`Error downloading: ${filename} - ${error}`);
          reject(error);
        });
      });
    } else {
      console.error(`Failed to download screenshot for ${page.name}: HTTP ${response.status}`);
      throw new Error(`Failed to download screenshot for ${page.name}: HTTP ${response.status}`);
    }
  }
  
// Function to upload a screenshot to Google Drive
async function uploadScreenshot(filename) {
  const media = {
    requestBody: { name: filename, parents: [DRIVE_FOLDER_ID], mimeType: 'image/png' },
    media: { mimeType: 'image/png', body: fs.createReadStream(filename) },
  };

  const response = await drive.files.create(media);

  if (response.data.id) {
    console.log(`Screenshot uploaded: ${filename}`);
    fs.unlinkSync(filename); // Remove the local screenshot after uploading
    return true;
  } else {
    throw new Error(`Failed to upload screenshot: ${filename}`);
  }
}

// Capture and upload all screenshots
async function captureAndUploadScreenshots() {
  for (const page of webpages) {
    try {
      const filename = await downloadScreenshot(page);
      await uploadScreenshot(filename);
    } catch (error) {
      console.error(error.message);
    }
  }
}

captureAndUploadScreenshots();



























