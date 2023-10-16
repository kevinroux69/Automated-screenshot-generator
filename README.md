# Automated screenshot generator

This script captures screenshots of specified webpages and uploads them to Google Drive. It uses the Screenshot Machine API for capturing screenshots and the Google Drive API for uploading.

## Prerequisites

Before using the script, make sure you have the following:

1. **Screenshot Machine API Key**: You can obtain this by signing up on the [Screenshot Machine website](https://www.screenshotmachine.com/).

2. **Google Drive Folder ID**: You need to specify the ID of the Google Drive folder where you want to upload the screenshots.

3. **Node.js**: Ensure you have Node.js installed on your machine.

4. **Service Account JSON Key File**: You should have a service account JSON key file for authentication with the Google Drive API.

## Setup

1. Clone this repository.

2. Install the required Node.js modules using `npm install`.

3. Replace the placeholders with your API key, Google Drive folder ID, and service account JSON key file.

4. Define the webpages you want to capture by modifying the `webpages` array.

